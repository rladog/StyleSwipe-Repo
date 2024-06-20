import { supabase } from "@/utils/supabase";
import getNewItemId from "@/utils/getNewItemId";
import getListings from "@/utils/getListings";
import getUserId from "@/utils/getUserId";
export default async function createListing(imageURL, name, gender, category) {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

  /*
  ***required fields = ProductId, ImageURL, ProductTitle, Gender, ProductType, user_id

  1. Get the number of items in the items table and add 60000 to that to use as ProductId
  2. Upsert the itemObj into items
  3. Upsert the listingsObj into listings with user_id added onto it
  
  */

  let id = await getNewItemId();
  let itemObj = {
    ProductId: id,
    ImageURL: imageURL,
    ProductTitle: name,
    Gender: gender,
    ProductType: category,
  };

  const { error: itemsError } = await supabase.from("items").upsert(itemObj);

  if (itemsError) {
    alert("Error creating listing");
    console.log(itemsError);
    return false;
  }

  let ProductArray = await getListings();

  ProductArray.push(itemObj);

  let listingObj = {
    user_id: userId,
    ProductArray,
  };

  const { listingError } = await supabase.from("listings").upsert(listingObj);

  if (listingError) {
    alert("Error creating listing");
    console.log(listingError);
    return false;
  }

  return true;
}
