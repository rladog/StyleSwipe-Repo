import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import useSession from "@/hooks/useSession";
import { supabase } from "@/utils/supabase";
import redirect from "@/utils/redirect";
import changePassword from "@/utils/changePassword";

export default function NewPasswordTab() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(""); // You might not need this if not verifying old password
  const [message, setMessage] = useState("");
  const [requestSuccess, changeRequestSuccess] = useState(false);

  function passwordChangeFail(msg) {
    changeRequestSuccess(false);
    setMessage(msg);
  }

  function passwordChangeSuccess(msg) {
    changeRequestSuccess(true);
    setMessage(msg);
  }

  return (
    <View style={styles.container}>
      {/* <Pressable style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable> */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter New Password</Text>
        <TextInput
          style={styles.input}
          // placeholder="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          // placeholder="Confirm new password"
          value={newPasswordConfirm}
          onChangeText={setNewPasswordConfirm}
          secureTextEntry
        />
      </View>
      <Pressable
        style={styles.changeButton}
        onPress={() =>
          changePassword(
            newPassword,
            newPasswordConfirm,
            passwordChangeFail,
            passwordChangeSuccess
          )
        }
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>
      {message ? (
        <Text
          style={{
            ...styles.messageText,
            color: requestSuccess ? "green" : "red",
          }}
        >
          {message}
        </Text>
      ) : null}
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
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    textAlign: "center",
  },
});
