import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import CardDeck from "@/components/tabs/Home/CardDeck";
import { useEffect, useState } from "react";
import useFontImport from "@/hooks/useFontImport";

const cartIcon = require("@/assets/icons/cart-icon.png");

export default function Profile({ session }) {
  console.log(session);
  const { fontsReady } = useFontImport();

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Profile</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>Change email address</Text>
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>Change password</Text>
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>View my listings</Text>
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>Create new listing</Text>
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>Wipe algorithm</Text>
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Text style={styles.optionText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  //Styling for heading containing the title and the filter icon
  headingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
    position: "absolute",
    zIndex: 1,
  },
  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
  optionsContainer: {
    marginTop: "32%",
    width: "90%",
    // borderWidth: 2,
    // borderColor: "black",
    justifyContent: "space-between",
    height: "80%",
  },
  optionItem: {
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    marginBottom: "5%",
    height: 60,
  },
  optionText: {
    textAlign: "center",
    // borderWidth: 2,
    // borderColor: "black",
    fontFamily: "Satoshi-Regular",
    fontSize: 20,
  },
});
