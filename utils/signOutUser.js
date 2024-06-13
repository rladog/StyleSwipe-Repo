import { supabase } from "@/utils/supabase";
import { router, useNavigation } from "expo-router";

export default async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error signing out user");
  }

  const navigation = useNavigation();
  navigation.reset({
    index: 0,
    routes: [{ name: "index" }],
  });
  router.replace("/");
}
