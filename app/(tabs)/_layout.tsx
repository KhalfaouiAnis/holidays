import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback } from 'react';

import { TabBarIcon } from '@/components';
import { Colors } from '@/constants/theme';
import useAuth from '@/core/auth';
import { useWebSocketStore } from '@/core/store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useShallow } from "zustand/shallow";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { unreadCount } = useWebSocketStore(useShallow((state) => state));
  const { status, token } = useAuth()
  

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  // useEffect(() => {
  //   if (token?.access) {
  //     initializeWebSocket()
  //   }
  // }, [token?.access])

  // useEffect(() => {
  //   let timeout: number;
  //   if (status !== "idle") {
  //     timeout = setTimeout(() => {
  //       hideSplash()
  //     }, 1000);
  //   }
  //   return () => {
  //     timeout && clearTimeout(timeout);
  //   }
  // }, [status, hideSplash])

  if (status === "idle" || status === "signOut") {
    return <Redirect href="/welcome" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5B2D9F',
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].icon,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-clear" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarIcon: ({ color }) => <TabBarIcon name="notifications" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
