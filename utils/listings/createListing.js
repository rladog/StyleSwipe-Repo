import { supabase } from "@/utils/common/supabase";
import getNewItemId from "@/utils/listings/getNewItemId";
import getListings from "@/utils/listings/getListings";
import getUserId from "@/utils/common/getUserId";
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

  let listings_array = await getListings();

  listings_array.push(itemObj);

  let listingObj = {
    user_id: userId,
    listings_array,
  };

  const { listingError } = await supabase.from("listings").upsert(listingObj);

  if (listingError) {
    alert("Error creating listing");
    console.log(listingError);
    return false;
  }

  return true;
}
