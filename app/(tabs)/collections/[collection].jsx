import { useFonts } from "expo-font";
import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Platform,
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import itemData from "@/assets/data/cards";
import AdJustableCard from "../../../components/page_components/AdjustableCard";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "@react-navigation/native";

export default function Page() {
  const [data, setData] = useState([]);

  const { collection } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const supa = async () => {
        const { data, error } = await supabase
          .from("collections")
          .select("collection_obj")
          .eq("user_id", 1)
          .single();
        let data2 = data.collection_obj;

        if (data2) {
          let idArray = data2[collection];

          const { data, error } = await supabase
            .from("items")
            .select()
            .in("ProductId", idArray);
          setData(data);
        }
      };

      supa();
    }, [])
  );

  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.item} key={item.ProductId}>
        {/* <Image style={styles.itemImage} source={{ uri: item.ImageURL }}></Image>
        <Text style={styles.itemName}>{item.ProductTitle}</Text> */}
        <AdJustableCard
          item={item}
          height={"100%"}
          gradientHeight={0.5}
          nameSize={12}
          descSize={10}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{collection}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // Setting numColumns to 2 places 2 items in a row
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
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
    fontFamily: "Satoshi-Bold",
    fontSize: 40,
  },
  listContainer: {
    paddingHorizontal: "4%",
    // alignItems: "center",
  },
  item: {
    marginHorizontal: "3%",
    width: "45%",
    height: 200,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "black",
    marginVertical: 15,
    alignItems: "center",
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
});

// import React from "react";
// import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";

// // Example data

// const App = () => {

//   return (

//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   listContainer: {
//     paddingHorizontal: 10, // Add padding to the sides of the list
//   },
//   itemContainer: {
//     flex: 1,
//     margin: 5, // Spacing between items
//     width: Dimensions.get("window").width * 0.4, // 40% of screen width
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f9c2ff", // Example color
//     minHeight: 100, // Minimum height for each item
//   },
//   itemText: {
//     fontSize: 16,
//   },
// });

// export default App;
