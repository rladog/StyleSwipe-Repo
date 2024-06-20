import { StyleSheet, View } from "react-native";
import { Redirect, useNavigation } from "expo-router";

export default function SignOutTab() {
  const navigation = useNavigation();
  navigation.reset({
    index: 0,
    routes: [{ name: "index" }],
  });

  const { error } = supabase.auth.signOut();

  if (error) {
    alert("Error signing out user");
  }

  return <Redirect href="/" />;
}
