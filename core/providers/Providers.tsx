import { APIProvider } from '@/core/api/api-provider';
import theme from '@/core/theme/use-theme-config';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from "@stripe/stripe-react-native";
import { ReactNode } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Toaster } from "sonner-native";

export const Providers = ({ children }: { children: ReactNode }) => (
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