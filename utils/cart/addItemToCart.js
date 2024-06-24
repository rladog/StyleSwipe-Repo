import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

/*
Utility function to add the given item Id
to the user's cart data inside the database
*/

export default async function addItemToCart(itemId) {
  let userId = await getUserId();
  console.log(userId);

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

  //Get the cart_array array from the database
  //with the current user's user ID
  const { data, error } = await supabase
    .from("cart")
    .select("cart_array")
    .eq("user_id", userId)
    .single();

  //Report errors if there was a problem fetching cart_array
  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return false;
  }

  if (data) {
    //Get the cart_array of the user from the database,
    //which contains only the ids of the items that the user saved to the cart
    //inside an array
    let cartItemIdArray = data?.cart_array;

    //If the id array already has the id of item being added to cart,
    //just return true and exit
    if (cartItemIdArray.find((id) => id == itemId)) return true;

    //If it doesn't, push the new item to the array
    cartItemIdArray.push(itemId);

    //Create a new object with the updated array
    const updates = {
      user_id: userId,
      cart_array: cartItemIdArray,
    };

    //Update the user's information with the updated array
    //Report errors if there are any
    const { error } = await supabase.from("cart").upsert(updates);
    if (error) {
      alert(`Error saving item #${itemId} to cart`);
      console.log(error);
      return false;
    }

    //Return true if there isn't
    return true;
  }
}
