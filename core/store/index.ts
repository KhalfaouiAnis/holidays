import { usePathname } from "expo-router";
import { toast } from "sonner-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getToken } from "../auth";
import { NotificationType, WS_URL } from "../constants";
import { onMessage } from "../socket/messageHandler";
import { zustandStorage } from "../storage";

interface ShoppingCartStoreInterface {
  item: ICartItem | null;
  addItem: (item: ICartItem) => void;
  removeItem: () => void;
  getItem: () => ICartItem | null;
  getTotalPrice: () => number;
}

interface WebSocketState {
  // notifications: INotificationItem[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (notificationId: string, userId: string) => void;
  // setNotifications: (messages: INotificationItem[]) => void;
  sendMessage: (message: string) => void;
  connect: (wsUrl: string) => void;
  disconnect: () => void;
}

export const useShoppingCartStore = create<ShoppingCartStoreInterface>()(
  persist(
    (set, get) => ({
      item: null,
      addItem: (newItem) => set({ item: newItem }),
      removeItem: () => set({ item: null }),
      getItem: () => get().item,
      getTotalPrice: () => {
        const { item } = get();
        return item ? item.price_per_night * item.days : 0;
      },
    }),
    {
      name: "holidia-store",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export const useWebSocketStore = create<WebSocketState>()(
  persist(
    (set, get) => {
      let ws: WebSocket | null = null;
      let reconnectAttempts = 0;
      const maxReconnectAttempts = 5;
      const baseReconnectDelay = 3000; // 3 seconds
      const token = getToken();

      const attemptReconnect = (wsUrl: string) => {
        if (!token) return;

        if (reconnectAttempts >= maxReconnectAttempts) {
          console.log("Max reconnect attempts reached; stopping");
          set({ isConnected: false });
          return;
        }

        const delay = baseReconnectDelay * 2 ** reconnectAttempts;
        console.log(
          `Reconnecting in ${delay}ms (attempt ${reconnectAttempts + 1})`
        );
        setTimeout(() => {
          reconnectAttempts++;
          get().connect(`${wsUrl}?token=${encodeURIComponent(token)}`);
        }, delay);
      };
      const pathname = usePathname();

      const updateUnreadNotificationsCount = () => {
        if (pathname !== "/notifications") {
          set((state) => ({
            unreadCount: state.unreadCount + 1,
          }));
        }
      };

      return {
        // notifications: [],
        unreadCount: 0,
        isConnected: false,
        sendMessage: (message: string) => {
          console.log("message: ", message);
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
          } else {
            toast.error("Not able to send message");
          }
        },
        connect: (wsUrl: string) => {
          if (!token) {
            console.log("No JWT token; skipping WebSocket connection");
            set({ isConnected: false });
            return;
          }

          // Avoid reconnecting if already connected
          if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("WebSocket already connected");
            return;
          }

          if (ws) {
            ws.close();
            ws = null;
          }
          // Create WebSocket with token
          ws = new WebSocket(`${wsUrl}?token=${encodeURIComponent(token)}`);

          ws.onopen = () => {
            console.log("WebSocket connection established");
            set({ isConnected: true });
            reconnectAttempts = 0;
          };

          ws.onmessage = (event) => {
            onMessage(event, updateUnreadNotificationsCount);
          };

          ws.onclose = (event) => {
            console.log("WebSocket connection closed:", {
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean,
            });
            set({ isConnected: false });
            ws = null;

            if (event.code === 1006) {
              attemptReconnect(WS_URL);
            } else if (event.code === 1000) {
              console.log("Normal closure (logout); not reconnecting");
            } else if (event.code === 1008) {
              console.log("Invalid token; not reconnecting");
            }
          };

          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            set({ isConnected: false });
          };
        },
        disconnect: () => {
          if (ws) {
            ws.close(1000, "Logout");
            ws = null;
            set({ isConnected: false, unreadCount: 0 });
            console.log("Disconnected from websocket");
          }
        },
        markAsRead: (notificationId: string, userId: string) => {
          set((state) => ({
            unreadCount: state.unreadCount--,
          }));
          console.log("notificationId; userId: ", notificationId, userId);
          get().sendMessage(
            JSON.stringify({
              type: NotificationType.NOTIFICATION_READ,
              payload: {
                notificationId,
                targetUserId: userId,
              },
            })
          );
        },
      };
    },
    {
      name: "websocket-storage",
      storage: createJSONStorage(() => zustandStorage),
      // partialize: (state) => ({
      //   unreadCount: state.unreadCount,
      // }),
    }
  )
);

export const initializeWebSocket = () => {
  try {
    const token = getToken();
    const { isConnected, connect } = useWebSocketStore.getState();
    if (token && !isConnected) {
      connect(`${WS_URL}?token=${encodeURIComponent(token)}`);
    }
  } catch (error) {
    console.error("Error initializing WebSocket:", error);
  }
};
