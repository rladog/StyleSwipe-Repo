import { supabase } from "@/utils/supabase";

export default async function getNewItemId() {
  let { data, error } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error:", error);
    return;
  }

  return data.length + 60000;
}
