import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/supabase";

export default async function getSession() {
  let session = await supabase.auth.getSession();
  console.log(session);
  return session;
}
