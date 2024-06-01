import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import useFontImport from "@/hooks/useFontImport";

export default function DetailedItemCard({
  height,
  width,
  gradientHeight,
  imageURL,
  name,
  gender,
  genderSize,
  type,
  typeSize,
  subtype,
  subtypeSize,
}) {
  const { fontsReady } = useFontImport();

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <View style={{ height, width, ...styles.card }}>
      {/* Gradient to make the description readable */}
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0, 0, 0, 0)", "rgba(20,20,0,1)"]}
        locations={[gradientHeight, 1.0]}
      ></LinearGradient>

      {/* View for containing the image */}
      <View style={styles.imageHolder}>
        <Image style={styles.cardImage} source={{ uri: imageURL }} />
      </View>

      {/* View for containing the name */}
      <View style={styles.textHolder}>
        <View style={styles.nameHolder}>
          <Text style={{ fontSize: nameSize, ...styles.itemName }}>{name}</Text>
        </View>
        <View style={styles.infoHolder}>
          <Text style={{ fontSize: genderSize, ...styles.itemGender }}>
            {gender}
          </Text>

          <View style={styles.typeHolder}>
            <Text style={{ fontSize: typeSize, ...styles.itemType }}>
              {type}
            </Text>
            <Text style={{ fontSize: subtypeSize, ...styles.itemSubtype }}>
              {subtype}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

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
    zIndex: -1,
  },
  textHolder: {
    zIndex: 2,
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
    textAlign: "center",
    marginBottom: "3%",
  },
  infoHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    marginBottom: "5%",
  },
  typeHolder: {
    display: "flex",
  },
  itemGender: {
    color: "white",
    fontFamily: "Satoshi-Light",
    textAlign: "center",
  },
  itemType: {
    color: "white",
    fontFamily: "Satoshi-Regular",
    marginBottom: "1%",
    textAlign: "center",
  },
  itemSubtype: {
    color: "white",
    fontFamily: "Satoshi-Regular",
    textAlign: "center",
  },
});
