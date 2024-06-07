import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import useSession from "@/hooks/useSession";
import useFontImport from "@/hooks/useFontImport";
import { supabase } from "@/utils/supabase";
import redirect from "@/utils/redirect";

export default function NewEmailTab() {
  const { fontsReady } = useFontImport();

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeEmail = async () => {
    if (!newEmail) {
      setMessage("Please enter a valid new email");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      setMessage("Error changing email: " + error.message);
    } else {
      setMessage("Email changed successfully!");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Pressable style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable> */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter New Email</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />
      </View>
      <Pressable style={styles.changeButton} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
      </Pressable>
      {message ? <Text style={styles.messageText}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
  },
  closeButton: {
    position: "absolute",
    top: "9%",
    left: "7.5%",
  },
  closeText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 24,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 10,
  },
  inputText: {
    fontFamily: "Satoshi-Regular",
    marginBottom: "1%",
    marginLeft: "1%",
    fontSize: 22,
  },
  input: {
    width: "100%",
    fontFamily: "Satoshi-Regular",
    height: 50,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    fontSize: 20,
  },
  changeButton: {
    width: "90%",
    borderWidth: 2,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
    marginTop: "5%",
  },
  buttonText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 30,
    color: "rgb(255, 255,247)",
  },
  messageText: {
    color: "red",
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    textAlign: "center",
  },
});
