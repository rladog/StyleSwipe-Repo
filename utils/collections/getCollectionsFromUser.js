import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";

export default async function getCollectionsFromUser(userId) {
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
