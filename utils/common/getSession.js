import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";

export default async function getSession() {
  let session = await supabase.auth.getSession();
  if (!session) {
    console.log("Error getting login info!");
  }
  return session;
}
