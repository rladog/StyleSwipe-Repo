import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

export default async function updateStartIndex(newIndex) {
  const userId = await getUserId();

  //Get the user information based on user id
  const { data, error: getError } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  //Output the error if there are any
  if (getError) {
    alert("Error getting user info for updating index");
    console.log(getError);
    return false;
  }

  //Update the received information with the new item index
  const newData = {
    ...data,
    item_index: newIndex,
  };

  //Upsert the updated information
  const { upsertError } = await supabase.from("profiles").upsert(newData);

  if (upsertError) {
    alert("Error updating user item index");
    console.log(upsertError);
    return false;
  }

  return true;
}
