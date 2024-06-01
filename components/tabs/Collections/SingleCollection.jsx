import { useState, useEffect, useCallback } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ItemCard from "@/components/tabs/_common/ItemCard";
import "react-native-url-polyfill/auto";

export default function SingleCollection({ collectionName, collectionData }) {
  const [collection, setCollection] = useState(collectionData);

  useEffect(() => {
    setCollection(collectionData);
  }, [collectionName, collectionData]);

  const renderItem = ({ item }) => {
    return (
      <View
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{collectionName}</Text>
      </View>
      <FlatList
        data={collection}
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
  listContainer: {
    paddingHorizontal: "4%",
  },

  itemImage: {
    width: "100%",
    height: "100%",
  },
});
