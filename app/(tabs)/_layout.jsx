import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(255, 255, 247)",
          height: "10%",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "file-tray-stacked" : "file-tray-stacked-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="itemDetail/[itemId]"
        options={{
          href: null,
          title: "Item Detail",
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="collection/[collectionName]"
        options={{
          href: null,
          title: "Collection",
        }}
      />
      <Tabs.Screen
        name="profile/newEmail"
        options={{
          href: null,
          title: "New Email",
        }}
      />
      <Tabs.Screen
        name="profile/newPassword"
        options={{
          href: null,
          title: "New Password",
        }}
      />
    </Tabs>
  );
}
