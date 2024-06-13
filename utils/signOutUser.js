import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

export default async function signOutUser(navigation) {
  navigation.reset({
    index: 0,
    routes: [{ name: "index" }],
  });

  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error signing out user");
  }

  router.replace("/");
}
