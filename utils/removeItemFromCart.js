import { supabase } from "@/utils/supabase";
import getUserId from "@/utils/getUserId";

/*
Utility function to remove the given item Id
from the user's cart data inside the database
*/

export default async function removeItemFromCart(itemId) {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

  //Get the cart_array array from the database
  //with the current user's user ID
  const { data, error } = await supabase
    .from("collections")
    .select("collection_obj")
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return false;
  }

  if (data) {
    //Get the cart_array of the user from the database,
    //which contains only the ids of the items that the user saved to the cart
    //inside an array
    let cartItemIdArray = data?.cartItemIdArray;

    //Remove the given item id from the array
    cartItemIdArray = cartItemIdArray.filter((x) => x != itemId);

    //Upsert the newly updated cart_array back into the database
    const updates = {
      user_id: userId,
      cartItemIdArray,
    };

    const { error } = await supabase.select("collections").upsert(updates);

    if (error) {
      alert(`Error removing items from ${collectionName}`);
      console.log(error);
      return false;
    }
    return true;
  }
}
