import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from "react-native";

export default function NewCollectionForm({ visible, onClose, onSubmit }) {
  const [collectionName, setCollectionName] = useState("");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter new collection name"
            value={collectionName}
            onChangeText={setCollectionName}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setCollectionName("");
                onSubmit(collectionName);
              }}
            >
              <Text>Create Collection</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCollectionName("");
                onClose();
              }}
              color="red"
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent background
  },
  formContainer: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensures the buttons are spread across the modal width
  },
});
