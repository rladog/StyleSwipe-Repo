import { useFonts } from "expo-font";
import { StyleSheet, Image, Platform, View, Text } from "react-native";

export default function Explore() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Explore</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    // top: "5%",
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    // borderColor: "black",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
  },
  titleText: {
    fontFamily: "Satoshi-Black",
    fontSize: 40,
    // height: "14%",
    // paddingLeft: "4%",
    // marginBottom: "4%",
    // textAlign: "center",
    // textAlignVertical: "bottom",
    // lineHeight: "14%",
    // alignSelf: "flex-end",
    // fontFamily: "Satoshi-Black",
    // position: "absolute",
    // fontSize: 40,
    // height: "16%",
    // paddingLeft: "4%",
    // textAlignVertical: "center",
  },
});
