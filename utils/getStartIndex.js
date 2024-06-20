import { supabase } from "@/utils/supabase";
import getUserId from "@/utils/getUserId";

export default async function getStartIndex() {
  const userId = await getUserId();

  //Get user information based on the user id
  const { data, error } = await supabase
    .from("profiles")
    .select("item_index")
    .eq("id", userId)
    .single();

  //Output the error if there are any
  if (error) {
    alert("Error getting start index");
    console.log(error);
    return null;
  }
  //Return the latest item index the user was looking at
  return data.item_index;
}
