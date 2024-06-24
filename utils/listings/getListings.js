import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

export default async function getListings() {
  let userId = await getUserId();

  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return null;
  }

  const { data, error } = await supabase
    .from("listings")
    .select("listings_array")
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    return data?.listings_array;
  }
}
