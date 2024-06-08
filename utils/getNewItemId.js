import { supabase } from "@/utils/supabase";

export default async function getNewItemId() {
  let { count, error } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error:", error);
    return;
  }
  return count + 60000;
}
