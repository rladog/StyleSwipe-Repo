import { supabase } from "@/utils/supabase";

export default async function getCards() {
  //Get all the rows from table "items" in the database
  const { data, error } = await supabase.from("items").select();

  //If there was an error fetching the data
  //report the user of the error
  if (error) {
    alert("Error while fetching database");
    console.log(error);
    return null;
  }

  //If data was successfully retrieved,
  //set the card to the retrieved data
  //which is an array containing each row as an object
  if (data) {
    return data;
  }
}
