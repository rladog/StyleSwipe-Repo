import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";
export default async function removeItemFromCollection(itemId, collectionName) {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

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
    let collection_obj = data?.collection_obj;

    let collection = collection_obj[collectionName];

    if (collection == null) {
      alert(`Collection titled ${collectionName} doesn't exist`);
      console.log(error);
      return false;
    }

    let collectionArray = collection.productArray;

    collectionArray = collectionArray.filter((x) => x != itemId);

    collection = { ...collection, productArray: collectionArray}

    collection_obj = { collection, ...collection_obj };

    const updates = {
      user_id: userId,
      collection_obj,
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
