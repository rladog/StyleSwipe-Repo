import { supabase } from "@/utils/supabase";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";
import { useState } from "react";
import pickImage from "@/utils/pickImage";
import uploadImage from "@/utils/uploadImage";
import createListing from "@/utils/createListing";
const trashIcon = require("@/assets/icons/trash-icon.png");

/*
Component for users to create a new listing
*/

export default function NewListingTab() {
  //State to store the URI for the item image
  const [itemImage, setItemImage] = useState(null);
  //States to store the new item name, gender, and category
  const [itemName, setItemName] = useState("");
  const [itemGender, setItemGender] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  async function uploadListing(itemImage, itemName, itemGender, itemCategory) {
    //Alert the users if any of the required fields are missing
    if (!itemImage) {
      alert("Item image missing!");
      return false;
    }
    if (!itemName) {
      alert("Item name missing!");
      return false;
    }
    if (!itemGender) {
      alert("Item gender missing!");
      return false;
    }
    if (!itemCategory) {
      alert("Item category missing!");
      return false;
    }

    //call the uploadImage() function with the item image URI
    let { data: imageData } = await uploadImage(itemImage);
    //get the online link of the uploaded item image
    let imageURL = imageData.link;

    //create a new listing with the given fields
    await createListing(imageURL, itemName, itemGender, itemCategory);
    return true;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      testID="new-listing-tab-container"
    >
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>New Listing</Text>
        <Text style={styles.titleSubText}>
          Fields marked with * are required
        </Text>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputText}>Image*</Text>
        <Pressable
          testID="new-listing-image-input"
          style={styles.imageInput}
          onPress={() => pickImage().then((data) => setItemImage(data))}
        >
          {itemImage && (
            <Image source={{ uri: itemImage }} style={styles.itemImage} />
          )}
          {!itemImage && <Text style={styles.addItemImageText}>+</Text>}
        </Pressable>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputText}>Item Name*</Text>
        <TextInput
          testID="new-listing-name-input"
          style={styles.textInput}
          onChangeText={setItemName}
        ></TextInput>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputText}>Category*</Text>
        <TextInput
          testID="new-listing-category-input"
          style={styles.textInput}
          onChangeText={setItemCategory}
        ></TextInput>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputText}>Gender*</Text>
        <TextInput
          testID="new-listing-gender-input"
          style={styles.textInput}
          onChangeText={setItemGender}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.createButton}
          testID="new-listing-cancel-button"
        >
          <Image source={trashIcon} style={{ width: 48, height: 48 }} />
        </Pressable>
        <Pressable
          style={styles.createButton}
          onPress={() =>
            uploadListing(itemImage, itemName, itemGender, itemCategory)
          }
          testID="new-listing-create-button"
        >
          <Text style={styles.createButtonText}>CREATE</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 247)",
    // minHeight: "100%",
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  headingContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    paddingHorizontal: "5%",
    top: "5%",
    textAlignVertical: "center",
    paddingLeft: "4%",
    marginBottom: "10%",
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
  titleSubText: {
    fontFamily: "Satoshi-Bold",
    color: "red",
    paddingLeft: 2,
  },
  inputsContainer: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    width: "90%",
  },
  inputText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    marginBottom: 5,
  },
  imageInput: {
    borderWidth: 2,
    width: 150,
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  addItemImageText: {
    fontSize: 80,
    color: "rgba(0, 0, 0, 0.5)",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width: "100%",
    height: 40,
    borderRadius: 15,
    fontFamily: "Satoshi-Regular",
    padding: 10,
  },
  buttonContainer: {
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3%",
    marginTop: "3%",
    flexDirection: "row",
  },
  createButton: {
    width: "47%",
    height: 60,
    borderWidth: 2,
    backgroundColor: "black",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "white",
    fontFamily: "Satoshi-Black",
    fontSize: 30,
    letterSpacing: 1,
  },
});
