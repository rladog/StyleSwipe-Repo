import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import useFontImport from "@/hooks/useFontImport";
import DetailedItemCard from "../_common/DetailedItemCard";

export default function ItemDetails({ closeFn, addFn, itemObj }) {
  const { fontsReady } = useFontImport();

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <Modal>
      <View style={styles.card}>
        <View style={styles.buttonHolder}>
          <Pressable style={styles.closePressable} onPress={closeFn}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
          <Pressable style={styles.addPressable} onPress={addFn}>
            <Text style={styles.addText}>Add to collection</Text>
          </Pressable>
        </View>

        <DetailedItemCard
          height={"100%"}
          width={"100%"}
          gradientHeight={0.6}
          imageURL={itemObj.ImageURL}
          name={itemObj.ProductTitle}
          na
          gender={itemObj.Gender}
          genderSize={20}
          type={itemObj.ProductType}
          typeSize={20}
          subtype={itemObj.SubCategory}
          subtypeSize={18}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 247)",
    margin: 0,
  },
  buttonHolder: {
    width: "100%",
    position: "absolute",
    top: "10%",
    zIndex: 1,
  },
  closePressable: {},
  closeText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 22,
  },
  addPressable: {},
  addText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 22,
  },
});
