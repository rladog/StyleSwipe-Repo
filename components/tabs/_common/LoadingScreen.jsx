import { Modal, View, Text, StyleSheet } from "react-native";
export default function LoadingScreen({ loadingText }) {
  return (
    <Modal>
      <View style={styles.container}>
        <Text style={styles["loadingText"]}>{loadingText}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 247)",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 28,
    fontFamily: "Satoshi-Light",
    textAlign: "center",
  },
});
