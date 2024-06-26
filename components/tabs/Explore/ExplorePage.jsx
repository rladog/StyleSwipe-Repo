import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import redirect from "@/utils/redirect";
import ItemCard from "@/components/tabs/_common/ItemCard"; // Import the ItemCard component

/*
The main component to be displayed on a single collection page
which users can edit and remove items from

Takes in the collection name,
an array of item objects in that collection,
and a callback function to be called when an item is deleted from collection
*/

export default function ExplorePage({ explorePageName, explorePageData }) {
  //State to store the data of the collection
  const [items, setItems] = useState(explorePageData);

  /*
  Call useEffect every time the "collectionData" prop 
  or the "collectionName" prop changes
  to update state accordingly
  */
  useEffect(() => {
    setItems(explorePageData);
  }, [explorePageName, explorePageData]);

  //Function to display each items in the collection
  //using the ItemCard
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => redirect(`itemDetail/${item.ProductId}`)}
      style={{
        marginHorizontal: "3%",
        width: "45%",
        height: 200,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "black",
        marginVertical: 15,
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <ItemCard
        height={"100%"}
        width={"100%"}
        gradientHeight={0.5}
        imageURL={item.ImageURL}
        name={item.ProductTitle}
        nameSize={12}
      />
    </Pressable>
  );

  return (
    <View
      style={styles.container}
      testID="editable-single-collection-container"
    >
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{explorePageName}</Text>
      </View>
      <FlatList
        testID="editable-single-collection-item-list"
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.ProductId}
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
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
  },
  titleText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 40,
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: "4%",
  },
  deleteToggleText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 22,
  },
  cancelDeleteText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 22,
  },
});
