import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

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
    .from("cart")
    .select("cart_array")
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
    let cartItemIdArray = data?.cart_array;

    //Remove the given item id from the array
    cartItemIdArray = cartItemIdArray.filter((x) => x != itemId);

    //Upsert the newly updated cart_array back into the database
    const updates = {
      user_id: userId,
      cart_array: cartItemIdArray,
    };

    const { error } = await supabase.from("cart").upsert(updates);

    if (error) {
      alert(`Error removing item from cart`);
      console.log(error);
      return false;
    }
    return true;
  }
}
