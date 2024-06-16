import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default async function getSingleCollection(collectionName) {
  let session = await getSession();

  if (!session) {
    alert("Error getting login info");
    console.log(error);
    return null;
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
      return idArray;
    }
  }
}
