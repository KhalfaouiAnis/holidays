import { APIProvider } from '@/core/api/api-provider';
import theme from '@/core/theme/use-theme-config';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import "./global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <APIProvider>
        <ThemeProvider value={theme}>
          <BottomSheetModalProvider>
            {children}
          </BottomSheetModalProvider>
        </ThemeProvider>
      </APIProvider>
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
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </Providers>
  );
}
