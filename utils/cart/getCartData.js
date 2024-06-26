import { supabase } from "@/utils/common/supabase";
import getUserId from "@/utils/common/getUserId";

export default async function getCartData() {
  const userId = await getUserId();
  if (!userId) {
    alert("Error getting login info");
    console.log(error);
    return null;
  }

  const { data, error } = supabase
    .from("cart")
    .select("cart_array")
    .eq("user_id", userId)
    .single();

  if (error) {
    alert("Error getting cart info");
    console.log(error);
    return null;
  }

  return data.cart_array;
}
