import { supabase } from "@/utils/supabase";

export default async function addItemToCollection(
  session,
  itemId,
  collectionName
) {
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

    let collection = collection_obj[collectionName];

    if (collection == null) {
      alert(`Collection titled ${collectionName} doesn't exist`);
      console.log(error);
      return false;
    }
    if (collection.find((id) => id == itemId)) return true;
    collection.push(itemId);

    const updates = {
      user_id: userId,
      collection_obj,
    };

    const { error } = await supabase.from("collections").upsert(updates);
    if (error) {
      alert(`Error saving item #${itemId} to ${collectionName}`);
      console.log(error);
      return false;
    }
    return true;
  }
}
