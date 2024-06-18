import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import NewCollectionForm from "@/components/tabs/Home/NewCollectionForm";
import getCollections from "@/utils/getCollections";
import addItemToCollection from "@/utils/addItemToCollection";
import createCollection from "@/utils/createCollection";

/*
Component to display the collections the user can add a clothing item into
once the user goes to see the specific details of a clothing item

Takes in the current itemId the user was on when the menu was opened
the visibility of the menu,
the callback function to be called when the menu is closed
and the callback function to be called when an item is added to a collection on the menu
*/

function Menu({ itemId, visible, onClose, addToCollectionFn }) {
  //State for the visibility of the menu
  const [modalVisible, setModalVisible] = useState(false);
  //State for representing the list current collections as an array of collection object
  const [collections, setCollections] = useState([{}]);

  //Call useEffect to get collections through an API call to the backend
  //and set the collections state to the fetched data

  //This is done every time the menu is opened which corresponds to the "visibility" changes
  useEffect(() => {
    getCollections().then((collections) => setCollections(collections));
  }, [modalVisible]);

  return (
    <>
      {/* Render the menu conditionally based on the "visible" state */}
      {visible && (
        <View testID="collection-menu-container" style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.menuContainer}>
              <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitleText}>
                  Choose collections to add to
                </Text>
              </View>
              <View style={styles.listContainer}>
                {/* The list of collections is rendered through a FlatList */}
                <FlatList
                  testID="collections-list"
                  data={collections ? Object.keys(collections) : []}
                  keyExtractor={(item) => item}
                  // Each item is rendered as a TouchableOpacity
                  // Pressing the item adds the clothing item the user was viewing
                  // into the collection represented by the item
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        padding: 10,
                        marginVertical: 8,
                        backgroundColor: "rgb(255, 255, 247)",
                        borderWidth: 2,
                        borderRadius: 10,
                      }}
                      onPress={() => addToCollectionFn(itemId, item)}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontFamily: "Satoshi-Regular",
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  // The footer contains a Pressable that when pressed
                  // brings up a form for creating a new collection
                  ListFooterComponent={
                    <Pressable
                      style={styles.newButton}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.newText}>New Collection</Text>
                    </Pressable>
                  }
                />
              </View>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                testID="collection-menu-close-button"
              >
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
          <NewCollectionForm
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={(newCollectionName) => {
              setModalVisible(false);
              createCollection(newCollectionName);
            }}
          />
        </View>
      )}
    </>
  );
}

// Return a function that returns a CollectionMenu
// that adds clothing items into a collection item
// by making a call to the backend with the addItemToCollection() function
export default function CollectionMenu({ itemId, visible, onClose }) {
  return (
    <Menu
      itemId={itemId}
      visible={visible}
      onClose={onClose}
      addToCollectionFn={(itemId, collectionName) =>
        addItemToCollection(itemId, collectionName)
      }
    />
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    marginBottom: "10%",
    width: "75%",
    height: "70%",
    backgroundColor: "rgb(255, 255, 247)",
    borderRadius: 20,
    padding: 35,
    alignItems: "stretch",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  menuTitleContainer: {
    marginTop: "-5%",
    alignSelf: "stretch",
  },
  menuTitleText: {
    textAlign: "center",
  },
  listContainer: {
    height: "75%",
  },
  newButton: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "rgb(255, 255, 247)",
    borderWidth: 2,
    borderRadius: 10,
  },
  newText: {
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
  closeButton: {
    marginBottom: "-10%",
    width: "100%",
    padding: 10,
    backgroundColor: "rgb(255, 255, 247)",
    borderWidth: 2,
    borderRadius: 10,
  },
  closeText: {
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
});
