import { supabase } from "@/utils/supabase";
import getUserId from "@/utils/getUserId";

/*
Utility function to remove the given item Id
from the user's listings data inside the database
*/

export default async function removeItemFromListings(itemId) {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

  //Get the cart_array array from the database
  //with the current user's user ID
  const { data, error } = await supabase
    .from("listings")
    .select("listings_array")
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
    let listingsItemArray = data?.listings_array;

    //Remove the given item id from the array
    listingsItemArray = listingsItemArray.filter((x) => x.ProductId != itemId);

    //Upsert the newly updated cart_array back into the database
    const updates = {
      user_id: userId,
      listings_array: listingsItemArray,
    };

    const { error } = await supabase.from("listings").upsert(updates);

    if (error) {
      alert(`Error removing item from listings`);
      console.log(error);
      return false;
    }
    return true;
  }
}
