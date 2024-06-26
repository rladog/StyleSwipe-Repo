import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";

export default async function getItemObjById(itemId) {
  const { data, error } = await supabase
    .from("items")
    .select()
    .eq("ProductId", itemId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    return data;
  }
}
