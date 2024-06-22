import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "react-native";

const homeIcon = require("@/assets/icons/home-icon.png");
const collectionsIcon = require("@/assets/icons/collections-icon.png");
const profileIcon = require("@/assets/icons/profile-icon.png");
const cartIcon = require("@/assets/icons/cart-icon.png");
const plusIcon = require("@/assets/icons/plus-icon.png");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgb(255, 255, 247)",
          height: "10%",
        },
        tabBarHideOnKeyboard: true,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={homeIcon}
              style={{
                width: 48,
                height: 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection/index"
        options={{
          title: "Collections",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={collectionsIcon}
              style={{
                width: 48,
                height: 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="listings/index"
        options={{
          title: "Listings",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={plusIcon}
              style={{
                width: 48,
                height: 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={cartIcon}
              style={{
                width: 48,
                height: 48,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={profileIcon}
              style={{
                width: 50,
                height: 50,
                tintColor: focused ? color : "gray", // Optional: change color when focused
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection/index"
        options={{
          title: "Collections",
          href: null,
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
      <Tabs.Screen
        name="profile/signOut"
        options={{
          href: null,
          title: "Sign out",
        }}
      />
      <Tabs.Screen
        name="listings/newListing"
        options={{
          href: null,
          title: "New Listing",
        }}
      />
    </Tabs>
  );
}
