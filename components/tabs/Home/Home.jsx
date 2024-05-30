import { StyleSheet, View, Text } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Swipe!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
    alignItems: "center",
    justifyContent: "center",
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
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
});
