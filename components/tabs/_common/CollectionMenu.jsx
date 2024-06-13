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
import NewCollectionForm from "@/components/tabs/_common/NewCollectionForm";
import useFontImport from "@/hooks/useFontImport";
import getCollections from "@/utils/getCollections";

export default function CollectionMenu({
  itemId,
  visible,
  onClose,
  addToCollectionFn,
  newCollectionFn,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [collections, setCollections] = useState([{}]);
  const { fontsReady } = useFontImport();

  useEffect(() => {
    getCollections().then((collections) => setCollections(collections));
  }, []);

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  const addItemToCollection = (itemId, collectionName) => {
    console.log(`Item ${itemId} added to ${collectionName}`);
    addToCollectionFn(itemId, collectionName);
    // Additional logic to update collections state or backend can be implemented here
  };

  const createNewCollection = (itemId, collectionName) => {
    if (collectionName && !collections[collectionName]) {
      const newCollections = { ...collections, [collectionName]: [itemId] };
      setCollections(newCollections);
      newCollectionFn(itemId, collectionName);
    }
    setModalVisible(false);
  };

  return (
    <>
      {visible && (
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.menuContainer}>
              <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitleText}>
                  Choose collections to add to
                </Text>
              </View>
              <View style={styles.listContainer}>
                <FlatList
                  data={collections ? Object.keys(collections) : []}
                  keyExtractor={(item) => item}
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
                      onPress={() => addItemToCollection(itemId, item)}
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
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
          <NewCollectionForm
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={(collectionName) =>
              createNewCollection(itemId, collectionName)
            }
          />
        </View>
      )}
    </>
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
