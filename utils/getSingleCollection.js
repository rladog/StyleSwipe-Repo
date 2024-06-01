import { supabase } from "@/utils/supabase";

export default async function getSingleCollection(session, collectionName) {
  if (!session) return null;

  const { data, error } = await supabase
    .from("collections")
    .select("collection_obj")
    .eq("user_id", session?.user.id)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    const collection = data?.collection_obj[collectionName];

    if (collection == undefined || collection == null) return null;

    const { data: idArray, error } = await supabase
      .from("items")
      .select()
      .in("ProductId", collection);

    if (error) {
      alert("Error fetching collections");
      console.log(error);
      return null;
    }

    if (idArray) {
      console.log(idArray);
      return idArray;
    }
  }
}
