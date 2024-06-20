import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/supabase";
import getUserId from "@/utils/getUserId";

export default async function getCollections() {
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
    return data?.collection_obj;
  }
}
