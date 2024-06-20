import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import changeEmail from "@/utils/changeEmail";

/*
Component for users to change their email
*/

export default function NewEmailTab() {
  //State to store new email
  const [newEmail, setNewEmail] = useState("");
  //State to store the message to inform users of how the change went
  const [message, setMessage] = useState("");
  //State to store the success or failure of the email change
  const [requestSuccess, changeRequestSuccess] = useState(false);

  function emailChangeFail(msg) {
    changeRequestSuccess(false);
    setMessage(msg);
  }

  function emailChangeSuccess(msg) {
    changeRequestSuccess(true);
    setMessage(msg);
  }

  return (
    <View style={styles.container} testID="new-email-tab-container">
      {/* <Pressable style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable> */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter New Email</Text>
        {/* Change the new email state on input to be equal to the current value */}
        <TextInput
          testID="new-email-input"
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />
      </View>
      {/* 
      Call the changeEmail() function with callback functions
      which are called depending on the outcome of the update
      */}
      <Pressable
        testID="new-email-change-button"
        style={styles.changeButton}
        onPress={() =>
          changeEmail(newEmail, emailChangeFail, emailChangeSuccess)
        }
      >
        <Text style={styles.buttonText}>Change Email</Text>
      </Pressable>
      {message && (
        <Text
          style={{
            ...styles.messageText,
            color: requestSuccess ? "green" : "red",
          }}
        >
          {message}
        </Text>
      )}
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
