import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default async function getListings() {
  let session = await getSession();

  let user_id = session.data.session.user.id;

  const { data, error } = await supabase
    .from("listings")
    .select("ProductArray")
    .eq("user_id", user_id)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    console.log(data);
    return data?.ProductArray;
  }
}
