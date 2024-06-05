import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default async function createCollectionAndAdd(itemId, collectionName) {
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
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return false;
  }

  if (data) {
    let collection_obj = data?.collection_obj;

    if (collection_obj[collectionName] != null) {
      alert(`Collection with the name ${collectionName} already exists!`);
      return false;
    }

    collection_obj[collectionName] = [itemId];

    const updates = {
      user_id: user_id,
      collection_obj,
    };

    const { error } = await supabase.from("collections").upsert(updates);

    if (error) {
      alert(`Error creating new collection titled ${collectionName}`);
      console.log(error);
      return false;
    }

    return true;
  }
}
