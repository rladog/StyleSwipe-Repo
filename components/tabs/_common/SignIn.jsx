import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  AppState,
  TextInput,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, Input } from "@rneui/themed";
import redirect from "@/utils/redirect";
import { router } from "expo-router";

export default function SignIn({ changeToSignUpFn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    console.log(error);
    setLoading(false);

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
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            title="Sign In"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            title="Sign Up Instead"
            disabled={loading}
            onPress={() => changeToSignUpFn()}
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
