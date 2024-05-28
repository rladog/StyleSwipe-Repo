import { Link } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { TapGestureHandler, State } from "react-native-gesture-handler";

import React, { useState } from "react";
import { StyleSheet, Platform, View, Text, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

export default function AdJustableCard({
  item,
  height,
  gradientHeight,
  nameSize,
  descSize,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [fontsLoaded] = useFonts({
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  return (
    <View style={{ height: height, ...styles.card }}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0, 0, 0, 0)", "rgba(20,20,0,1)"]}
        locations={[gradientHeight, 1.0]}
      ></LinearGradient>

      {/* View for containing the image */}
      <View style={styles.imageHolder}>
        <Image style={styles.cardImage} source={{ uri: item.ImageURL }} />
      </View>

      {/* View for containing the text */}
      <View style={styles.textHolder}>
        <View style={styles.nameHolder}>
          <Text style={{ fontSize: nameSize, ...styles.itemName }}>
            {item.ProductTitle}
          </Text>
        </View>

        <View style={styles.infoHolder}>
          <Text style={{ fontSize: descSize, ...styles.itemPrice }}>
            {item.Gender}
          </Text>

          <View style={styles.locationHolder}>
            <Text style={{ fontSize: descSize, ...styles.itemLocation }}>
              {item.ProductType}
            </Text>
            <Text style={{ fontSize: descSize, ...styles.itemZipcode }}>
              {item.SubCategory}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
// Copy + paste for debugging
// borderWidth: 3,
// borderColor: "black",

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 247)",
    margin: 0,
  },
  gradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
  },
  imageHolder: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the width and respects height
    position: "absolute",
    zIndex: -4,
  },
  textHolder: {
    zIndex: 5,
    // position: "absolute",
    width: "100%",
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
  },
  nameHolder: {
    width: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: "3%",
  },
  itemName: {
    fontFamily: "Satoshi-Bold",
    color: "white",
    // fontSize: 32,
    textAlign: "center",
  },
  infoHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    marginBottom: "5%",
  },
  locationHolder: {
    display: "flex",
  },
  itemPrice: {
    color: "white",
    fontFamily: "Satoshi-Light",
    // fontSize: 20,
    textAlign: "center",
  },
  itemLocation: {
    color: "white",
    fontFamily: "Satoshi-Regular",
    // fontSize: 20,
    marginBottom: "1%",
    textAlign: "center",
  },
  itemZipcode: {
    color: "white",
    fontFamily: "Satoshi-Regular",
    // fontSize: 20,
    textAlign: "center",
  },
});
