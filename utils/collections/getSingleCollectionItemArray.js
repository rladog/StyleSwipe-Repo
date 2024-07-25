import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

export default async function getSingleCollectionItemArray(collectionName) {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return null;
  }

  const { data, error } = await supabase
    .from("collections")
    .select("collection_obj")
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    const collection = data?.collection_obj[collectionName];

    console.log(collection);

    if (collection == undefined || collection == null) return null;

    const { data: idArray, error } = await supabase
      .from("items")
      .select()
      
      .in("ProductId", collection["productArray"]);

    if (error) {
      alert("Error fetching collections");
      console.log(error);
      return null;
    }

    if (idArray) {
      return idArray;
    }
  }
}
