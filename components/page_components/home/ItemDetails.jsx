import { useFonts } from "expo-font";
import { useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import itemData from "@/assets/data/cards";

export default function ItemDetails({
  currentItemId,
  isVisible,
  closeFunction,
}) {
  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  return (
    <Modal visible={isVisible} onRequestClose={closeFunction}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={styles.titleText}
            >{`More on ${itemData[currentItemId].name}`}</Text>
          </View>

          <View style={styles.closeContainer}>
            <Pressable onPress={closeFunction}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
  },
  headingContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "absolute",
    left: "5%",
    top: "5%",
    zIndex: 14,
  },
  titleContainer: {
    width: "75%",
  },
  closeContainer: {
    marginTop: "4%",
    // position: "absolute",
  },
  titleText: {
    fontFamily: "Satoshi-Black",
    fontSize: 30,
  },
  closeText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 22,
  },
});
