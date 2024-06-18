import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import ItemCard from "@/components/tabs/_common/ItemCard"; // Import the ItemCard component

export default function EditableSingleCollection({
  collectionName,
  collectionData,
  deleteFn,
}) {
  const [collection, setCollection] = useState(collectionData);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    setCollection(collectionData);
  }, [collectionName, collectionData]);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    if (deleteMode) {
      setSelectedItems(new Set());
    }
  };

  const selectItem = (id) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleConfirmDelete = () => {
    selectedItems.forEach((id) => {
      deleteFn(id, collectionName);
    });
    const newItems = collection.filter(
      (item) => !selectedItems.has(item.ProductId)
    );
    setCollection(newItems);
    setDeleteMode(false);
    setSelectedItems(new Set());
  };

  const renderItem = ({ item }) => (
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
      {deleteMode && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 5,
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onPress={() => selectItem(item.ProductId)}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {selectedItems.has(item.ProductId) ? "✓" : "✗"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{collectionName}</Text>
      </View>
      <View style={styles.pressableContainer}>
        {deleteMode && (
          <Pressable title="Cancel" onPress={toggleDeleteMode}>
            <Text style={styles.cancelDeleteText}>Cancel</Text>
          </Pressable>
        )}
        <Pressable
          onPress={deleteMode ? handleConfirmDelete : toggleDeleteMode}
        >
          <Text style={styles.deleteToggleText}>
            {deleteMode ? "Confirm" : "Edit"}
          </Text>
        </Pressable>
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
