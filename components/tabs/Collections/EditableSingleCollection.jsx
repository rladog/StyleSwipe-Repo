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

/*
The main component to be displayed on a single collection page
which users can edit and remove items from

Takes in the collection name,
an array of item objects in that collection,
and a callback function to be called when an item is deleted from collection
*/

export default function EditableSingleCollection({
  collectionName,
  collectionData,
  deleteFn,
  tapFn,
}) {
  //State to store the data of the collection
  const [collection, setCollection] = useState(collectionData);

  //State to store if the collection page is currently in delete mode
  const [deleteMode, setDeleteMode] = useState(false);

  //State to store the items selected for deletion in delete mode
  const [selectedItems, setSelectedItems] = useState(new Set());

  /*
  Call useEffect every time the "collectionData" prop 
  or the "collectionName" prop changes
  to update state accordingly
  */
  useEffect(() => {
    setCollection(collectionData);
  }, [collectionName, collectionData]);

  //Function for toggling the delete mode of the collection
  const toggleDeleteMode = () => {
    //Set the "deleteMode" state to be the opposite of what it was
    setDeleteMode(!deleteMode);

    //Clear the items that were selected
    //if deleteMode is changing from true to false
    if (deleteMode) {
      setSelectedItems(new Set());
    }
  };

  //Function for selecting an item to be deleted
  //and storing it inside the "selectedItems" set saved as state
  const selectItem = (id) => {
    //Copy the selectedItems state as to not mutate existing state
    const newSelectedItems = new Set(selectedItems);

    //If the given id is in selectedItems
    //remove it
    if (selectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      //otherwise add it
      newSelectedItems.add(id);
    }
    //Update state
    setSelectedItems(newSelectedItems);
  };

  //Function for deleting the selected items
  const handleConfirmDelete = () => {
    //Call the deleteFn callback function
    //for each of the item saved in the state to be deleted
    //with the collectionName
    selectedItems.forEach((id) => {
      deleteFn(id, collectionName);
    });
    //Update the local state
    //to remove any items that were deleted as well
    const newItems = collection.filter(
      (item) => !selectedItems.has(item.ProductId)
    );
    setCollection(newItems);
    setDeleteMode(false);
    setSelectedItems(new Set());
  };

  //Function to display each items in the collection
  //using the ItemCard
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        deleteMode ? selectItem(item.ProductId) : tapFn(item.ProductId);
      }}
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
        <View
          style={{
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 5,
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {selectedItems.has(item.ProductId) ? "✓" : "✗"}
          </Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <View
      style={styles.container}
      testID="editable-single-collection-container"
    >
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{collectionName}</Text>
      </View>
      <View style={styles.pressableContainer}>
        {deleteMode && (
          <Pressable
            testID="editable-single-collection-cancel-button"
            title="Cancel"
            onPress={toggleDeleteMode}
          >
            <Text style={styles.cancelDeleteText}>Cancel</Text>
          </Pressable>
        )}
        <Pressable
          testID="editable-single-collection-edit-toggle-button"
          onPress={deleteMode ? handleConfirmDelete : toggleDeleteMode}
        >
          <Text style={styles.deleteToggleText}>
            {deleteMode ? "Confirm" : "Edit"}
          </Text>
        </Pressable>
      </View>
      <FlatList
        testID="editable-single-collection-item-list"
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
