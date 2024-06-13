import { StyleSheet, View, Text, Image, Modal, Pressable } from "react-native";
import useFontImport from "@/hooks/useFontImport";
import DetailedItemCard from "@/components/tabs/_common/DetailedItemCard";
import CollectionMenu from "@/components/tabs/_common/CollectionMenu";
import { useState } from "react";
import LoadingScreen from "@/components/tabs/_common/LoadingScreen";

export default function ItemDetails({ itemObj, closeFn }) {
  const { fontsReady } = useFontImport();
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);

  if (!fontsReady) {
    return <LoadingScreen loadingText={"Loading..."} />; // Render nothing while fonts are loading
  }

  return (
    <>
      <View style={styles.modal}>
        <View style={styles.card}>
          <View style={styles.buttonHolder}>
            <Pressable style={styles.closePressable} onPress={closeFn}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
            <Pressable
              style={styles.addPressable}
              onPress={() => setShowCollectionMenu(true)}
            >
              <Text style={styles.addText}>{"Add to \ncollection"}</Text>
            </Pressable>
          </View>

          <DetailedItemCard
            height={"100%"}
            width={"100%"}
            gradientHeight={0.6}
            imageURL={itemObj.ImageURL}
            name={itemObj.ProductTitle}
            nameSize={40}
            gender={itemObj.Gender}
            genderSize={20}
            type={itemObj.ProductType}
            typeSize={20}
            subtype={itemObj.SubCategory}
            subtypeSize={18}
          />
          <View>
            <Pressable>
              <Text>Press me!</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <CollectionMenu
        visible={showCollectionMenu}
        itemId={itemObj.ProductId}
        onClose={() => setShowCollectionMenu(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 3,
  },
  card: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 247)",
    margin: 0,
  },
  buttonHolder: {
    width: "85%",
    position: "absolute",
    top: "9%",
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closePressable: {},
  closeText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 26,
    textShadowColor: "white",
    textShadowRadius: 5,
  },
  addPressable: {},
  addText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 22,
    textAlign: "center",
    textShadowRadius: 6,
  },
});
