import "react-native-url-polyfill/auto";
import { supabase } from "@/utils/common/supabase";

export default async function getUserTelegramId(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("telegram_username")
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error fetching collections");
    console.log(error);
    return null;
  }

  if (data) {
    return data?.telegram_username;
  }
}
