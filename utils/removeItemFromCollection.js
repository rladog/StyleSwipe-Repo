import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default async function removeItemFromCollection(itemId, collectionName) {
  let session = await getSession();

  if (!session) {
    alert("Error getting login info");
    console.log(error);
    return false;
  }

  let user_id = session.data.session.user.id;

  const { data, error } = await supabase
    .from("collections")
    .select("collection_obj")
    .eq("user_id", user_id)
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

    function removeNumber(array, numberToRemove) {
      return array.filter((item) => item !== numberToRemove);
    }

    collection = collection.filter((x) => x != itemId);

    collection_obj = { collection, ...collection_obj };

    const updates = {
      user_id: user_id,
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
