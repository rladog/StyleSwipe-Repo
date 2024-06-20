import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/supabase";

export default async function getUserId() {
  //Get session information from Supabase
  let session = await supabase.auth.getSession();
  if (!session) {
    console.log("Error getting user ID!");
  }
  //Return the user id from session information
  return session?.data.session.user.id;
}
