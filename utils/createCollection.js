import { supabase } from "@/utils/supabase";

export default async function createCollection(session, collectionName) {
  if (!session) return false;

  let userId = session.user.id;

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

    collection_obj[collectionName] = [];

    const updates = {
      user_id: session.user.id,
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
