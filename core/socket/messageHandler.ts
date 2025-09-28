import { queryKeys } from "@/constants";
import { toast } from "sonner-native";
import { queryClient } from "../api/api-provider";
import { NotificationType } from "../constants";

export const onMessage = (event: MessageEvent<any>, callback?: () => void) => {
  try {
    const message: NotificationBroadcastMessage = JSON.parse(event.data);
    if (message.type === NotificationType.BROADCAST) {
      toast.info(`${message.title}, ${message.message}`, {
        duration: 10000,
      });
    } else if (message.type === NotificationType.USER_BOOKING) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USER_NOTIFICATIONS],
      });
      typeof callback === "function" && callback();
    }
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
};
