import { supabase } from "./supabase";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveLikedItemId(userId, collectionName, itemId) {
  const { data, error } = await supabase
    .from("collections")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    Alert(
      "There was an error saving this item to the " +
        collectionName +
        " collection"
    );
  }

  if (data) {
    console.log(data);
    let collection_obj = data.collection_obj;

    let collection = collection_obj[collectionName];

    if (collection != null) {
      collection.push(itemId);
    } else {
      collection = [itemId];
    }
    collection_obj[collectionName] = collection;

    await supabase
      .from("collections")
      .upsert({ user_id: userId, collection_obj });

    console.log(collection_obj);
  }

  /*
  try {
    //Get the array of item ids stored in the given collection
    //in a string format
    let idArray = await AsyncStorage.getItem(collectionName);

    if (idArray !== null) {
      //If there is an array, convert the string into an array
      idArray = JSON.parse(idArray);
      //Push the new item id to the end of the array
      idArray.push(itemId);

      //Map the modified array with the collection
      idArray = JSON.stringify(idArray);
      await AsyncStorage.setItem(collectionName, idArray);
    } else {
      //Create a new array with the new item id
      idArray = [itemId];

      //Map the new array with the collection
      idArray = JSON.stringify(idArray);
      await AsyncStorage.setItem(collectionName, idArray);
    }

    await AsyncStorage.removeItem(collectionName);
    console.log(idArray);
  } catch (e) {
    alert("Error storing liked item!");
    console.log(e);
  }
  */
}
