import { useFonts } from "expo-font";
import { Link } from "expo-router";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";
import CollectionItem from "@/components/page_components/collections/CollectionItem";

export default function Collections() {
  const [collections, setCollections] = useState({});

  useEffect(() => {
    const supa = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("collection_obj")
        .eq("user_id", 1)
        .single();

      if (error) {
        alert("Error fetching collections");
        console.log(error);
      }

      if (data) {
        setCollections(data.collection_obj);
      }
    };

    supa();
  }, []);

  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  // for (const [key, value] of Object.entries(collections)) {
  //   console.log(`${key}`);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Collections</Text>
      </View>

      <View style={styles.collectionsHolder}>
        {Object.entries(collections).map((keyValArray) => (
          <CollectionItem
            key={keyValArray[0]}
            href={`/collections/${keyValArray[0]}`}
            name={keyValArray[0]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    // top: "5%",
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    // borderColor: "black",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
  },
  titleText: {
    fontFamily: "Satoshi-Black",
    fontSize: 40,
  },
  collectionsHolder: {
    flex: 1,
    paddingHorizontal: "6%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 3,
    // borderColor: "black",
  },
  collectionItem: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    width: "45%",
    height: 100,
    textAlign: "center",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionItemLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    height: "100%",
    textAlignVertical: "center",
  },
  // collectionItemPressable: {
  //   width: "100%",
  //   height: "100%",
  //   fontSize: 18,
  //   textAlign: "center",
  //   borderWidth: 3,
  //   borderColor: "blue",
  // },
  collectionItemText: {
    width: "100%",
    height: "100%",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    display: "flex",
    flex: 1,
  },
});
