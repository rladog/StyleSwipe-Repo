import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default async function getCollections() {
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
    return data?.collection_obj;
  }
}
