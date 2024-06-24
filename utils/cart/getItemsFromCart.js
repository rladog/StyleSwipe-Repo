import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

/*
Utility function to get all the data objects for the items
stored inside the user's cart
*/

export default async function getItemsFromCart() {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return null;
  }

  //Get the cart_array from the database,
  //which contains only the id of the items saved to the user's cart
  //based on this user's id
  const { data, error } = await supabase
    .from("cart")
    .select("cart_array")
    .eq("user_id", userId)
    .single();

  //Report the error if there are any
  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    const idArray = data?.cart_array;

    //Using the received cart_array,
    //go through the entire item catalog
    //and get the data of items that have item ids stored inside cart_array
    const { data: cartItemArray, error } = await supabase
      .from("items")
      .select()
      .in("ProductId", idArray);

    if (error) {
      alert("Error fetching collections");
      console.log(error);
      return null;
    }

    //Return the array of item data objects
    if (cartItemArray) {
      return cartItemArray;
    }
  }
}
