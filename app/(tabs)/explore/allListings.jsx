import ExplorePage from "@/components/tabs/Explore/ExplorePage";
import { Redirect, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { View, Text } from "react-native";
import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";

async function getAllListings() {
  const { data, error } = await supabase
    .from("listings")
    .select("listings_array");

  if (error) {
    console.log(error);
    Alert.alert("Error getting this page!");
    return null;
  }
  let ret = [];

  for (const listingsObj of data) {
    ret.push(listingsObj.listings_array);
  }
  return ret.flat();
}

export default function AllListings() {
  const [listings, setListings] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getAllListings().then((obj) => setListings(obj));
    }, [])
  );

  return (
    <ExplorePage
      explorePageName={"All user listings"}
      explorePageData={listings}
    />
  );
}
