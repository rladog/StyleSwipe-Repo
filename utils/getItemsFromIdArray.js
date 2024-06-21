import { supabase } from "@/utils/supabase";
//Function for getting an array of item datas (JSON format)
//from a given array of item IDs

export default async function getItemsFromIdArray(idArray) {
  const { data, error } = await supabase
    .from("items")
    .select()
    .in("ProductId", idArray);

  if (error) {
    alert("Error getting items from given id array");
    console.log(error);
    return null;
  }

  return data;
}
