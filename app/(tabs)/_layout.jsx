import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "react-native";

const HomeIcon = require("@/assets/images/navbar/home-icon.png");
const ExploreIcon = require("@/assets/images/navbar/explore-icon.png");
const CollectionsIcon = require("@/assets/images/navbar/collections-icon.png");
const ProfileIcon = require("@/assets/images/navbar/profile-icon.png");

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgb(255, 255, 247)",
          height: "10%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={HomeIcon}
              style={{
                width: focused ? 48 : 48, // Change size when focused
                height: focused ? 48 : 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={ExploreIcon}
              style={{
                width: focused ? 48 : 48, // Change size when focused
                height: focused ? 48 : 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collections",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={CollectionsIcon}
              style={{
                width: focused ? 48 : 48, // Change size when focused
                height: focused ? 48 : 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collections/[collection]"
        options={{
          href: null,
          title: "Collection",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={ProfileIcon}
              style={{
                width: focused ? 48 : 48, // Change size when focused
                height: focused ? 48 : 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={ProfileIcon}
              style={{
                width: focused ? 48 : 48, // Change size when focused
                height: focused ? 48 : 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
