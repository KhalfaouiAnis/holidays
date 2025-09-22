import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { TabBarIcon } from '@/components';
import { Colors } from '@/constants/theme';
import useAuth from '@/core/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { status } = useAuth()

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    let timeout: number;
    if (status !== "idle") {
      timeout = setTimeout(() => {
        hideSplash()
      }, 1000);
    }
    return () => {
      timeout && clearTimeout(timeout);
    }
  }, [status, hideSplash])

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
        tabBarShowLabel: false,
        
        
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
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
