import { APIProvider } from '@/core/api/api-provider';
import { hydrateAuth } from '@/core/auth';
import theme from '@/core/theme/use-theme-config';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Notifications from "expo-notifications";
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Toaster } from "sonner-native";

import 'react-native-reanimated';
import "./global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

hydrateAuth();
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
  })
})

const Providers = ({ children }: { children: ReactNode }) => {
  // const { handleURLCallback } = useStripe()
  // const [notifications, setNotifications] = useState<Notifications.Notification>()

  // const notificationListener = useRef<Notifications.EventSubscription | null>(null)
  // const responseListener = useRef<Notifications.EventSubscription | null>(null)

  // useEffect(() => {

  //   const initNotifications = async () => {
  //     const token = await registerForPushNotificationsAsync();
  //     if (token) {
  //       const deviceId = await getDeviceId()
  //       await axios.post("https://supersimplenotesapi.onrender.com/users/subscription", {
  //         pushToken: token,
  //         deviceId
  //       })
  //     }
  //   }

  //   initNotifications()

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => setNotifications(notification));
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   })

  //   return () => {
  //     if (notificationListener.current) {
  //       notificationListener.current.remove()
  //     }
  //     if (responseListener.current) {
  //       responseListener.current.remove()
  //     }

  //   }
  // })

  // const handleDeeplink = useCallback(async (url: string | null) => {
  //   if (!url) return;

  //   try {
  //     const stripeHandled = await handleURLCallback(url);
  //     if (stripeHandled) {
  //       console.log("handle stripe payment");
  //     } else {

  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }, [handleURLCallback])

  // useEffect(() => {
  //   const getInitialURL = async () => {
  //     try {
  //       const initialURL = await Linking.getInitialURL();
  //       await handleDeeplink(initialURL);
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   }

  //   getInitialURL()

  //   const subscription = Linking.addEventListener("url", (event) => {
  //     handleDeeplink(event.url)
  //   })

  //   return () => {
  //     subscription.remove()
  //   }
  // }, [handleDeeplink])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISAHBLE_KEY || ""}>
        <APIProvider>
          <KeyboardProvider>
            <ThemeProvider value={theme}>
              <BottomSheetModalProvider>
                {children}
              </BottomSheetModalProvider>
            </ThemeProvider>
          </KeyboardProvider>
        </APIProvider>
      </StripeProvider>
      <Toaster />
    </GestureHandlerRootView>
  )
}

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="properties/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="payment-successful" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </Providers>
  );
}
