import { Modal, View, Text, StyleSheet } from "react-native";
import useFontImport from "@/hooks/useFontImport";
export default function LoadingScreen({ loadingText }) {
  const { fontsReady } = useFontImport();

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
    fontSize: 50,
    fontFamily: "Satoshi-Light",
  },
});
