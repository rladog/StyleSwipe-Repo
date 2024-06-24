import React, { useCallback, useState } from "react";
import { Alert, Modal, StyleSheet, View, AppState } from "react-native";
import { supabase } from "@/utils/common/supabase";
import { Button, Input } from "@rneui/themed";
import redirect from "@/utils/common/redirect";
import { router } from "expo-router";

export default function SignUp({ changeToSignInFn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (!telegramUsername) {
      Alert.alert("Please enter a valid telegram username!");
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    //Insert necessary informations regarding the user into the backend
    const { data: profileData, error: fetchProfileError } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .single();

    if (fetchProfileError) {
      Alert.alert(fetchProfileError.message);
      console.log(fetchProfileError);
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      ...profileData,
      telegram_username: telegramUsername,
    });

    if (profileError) {
      Alert.alert(profileError.message);
      console.log(profileError);

      setLoading(false);
      return;
    }

    const { error: listingsError } = await supabase.from("listings").insert({
      user_id: session.user.id,
      listings_array: [],
    });

    if (listingsError) {
      Alert.alert(listingsError.message);
      console.log(listingsError);

      setLoading(false);
      return;
    }

    const { error: cartError } = await supabase.from("cart").insert({
      user_id: session.user.id,
      cart_array: [],
    });

    if (cartError) {
      Alert.alert(cartError.message);
      console.log(cartError);

      setLoading(false);
      return;
    }

    const { error: collectionsError } = await supabase
      .from("collections")
      .insert({
        user_id: session.user.id,
        collection_obj: { "Liked Items": [] },
      });

    if (collectionsError) {
      Alert.alert(collectionsError.message);
      console.log(collectionsError);
      setLoading(false);
      return;
    }

    redirect("/");
  }

  return (
    <Modal style={{ zIndex: 1000 }}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            style={styles.input}
            inputStyle={styles.input}
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.input}
            inputStyle={styles.input}
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.input}
            inputStyle={styles.input}
            label="Telegram Username"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setTelegramUsername(text)}
            value={telegramUsername}
            placeholder="Telegram Username"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            title="Sign Up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            title="Sign In Instead"
            disabled={loading}
            onPress={() => changeToSignInFn()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 247)",
    borderColor: "black",
    borderWidth: 2,
    height: "100%",
    padding: 12,
    paddingTop: "15%",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  input: {
    fontFamily: "Satoshi-Regular",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    height: 60,
    backgroundColor: "rgb(255, 255, 247)",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    marginBottom: "5%",
  },
  buttonText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 26,
    color: "black",
    letterSpacing: 1,
  },
});
