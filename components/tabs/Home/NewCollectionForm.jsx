import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from "react-native";

//Takes in visible as prop from its parent component to control the visibility
//Takes in onClose and onSubmit as prop which are callback functions to be called
//on closing or submitting the form
export default function NewCollectionForm({ visible, onClose, onSubmit }) {
  //State to keep track of the new collection name
  //being inputted into the form
  const [collectionName, setCollectionName] = useState("");

  return (
    //Returns a modal to contain the new collection form
    //on top of the item details page and the collections menu
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
      testID="new-collection-form-modal"
    >
      <View style={styles.container} testID="new-collection-form">
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter new collection name"
            value={collectionName}
            onChangeText={setCollectionName}
            style={styles.input}
            testID="new-collection-form-name-input"
          />
          <View style={styles.buttonContainer}>
            <Pressable
              testID="new-collection-form-cancel-button"
              onPress={() => {
                /* Calls the onClose callback which takes in no arguments */
                setCollectionName("");
                onClose();
              }}
              color="red"
            >
              <Text style={styles.closeFormText}>Close</Text>
            </Pressable>
            <Pressable
              testID="new-collection-form-submit-button"
              onPress={() => {
                /* Calls the onSubmit callback with the collectionName argument */
                setCollectionName("");
                onSubmit(collectionName);
              }}
            >
              <Text style={styles.createCollectionText}>Create</Text>
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
    width: 250,
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    fontFamily: "Satoshi-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 250, // Ensures the buttons are spread across the modal width
  },
  createCollectionText: {
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    fontSize: 24,
  },
  closeFormText: {
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    fontSize: 24,
  },
});
