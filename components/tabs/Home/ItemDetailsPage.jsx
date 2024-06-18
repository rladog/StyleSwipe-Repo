import { StyleSheet, View, Text, Image, Modal, Pressable } from "react-native";
import DetailedItemCard from "@/components/tabs/_common/DetailedItemCard";
import CollectionMenu from "@/components/tabs/Home/CollectionMenu";
import { useState } from "react";
import LoadingScreen from "@/components/tabs/_common/LoadingScreen";

/*
Component to display details about an item

Takes in an itemObj, which is an JSON representation of a clothing item
containing details regarding the item,
a callback function to be called when the page is closed,
and a callback function to be called when "Add to collections" is pressed
*/

function Details({ itemObj, closeFn, showCollectionsFn }) {
  return (
    <View testID="item-details-page-container" style={styles.modal}>
      <View style={styles.card}>
        <View style={styles.buttonHolder}>
          {/* Calls the closeFn callback function to close the item details page */}
          <Pressable
            testID="item-details-close-button"
            style={styles.closePressable}
            onPress={closeFn}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
          {/* Calls the showCollectionsFn callback function to show the item details page */}
          <Pressable
            testID="item-details-add-to-collections-button"
            style={styles.addPressable}
            onPress={showCollectionsFn}
          >
            <Text style={styles.addText}>{"Add to \ncollection"}</Text>
          </Pressable>
        </View>

        {/* 
          DetailedItemCard component is used to show the details about the item
          based on information stored in the itemObj prop
          */}
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
  );
}

export default function ItemDetails({ itemObj, closeFn }) {
  // State for whether the collection menu,
  // which shows collections the current clothing item can be saved to,
  // should be shown or not
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);

  return (
    <>
      <Details
        itemObj={itemObj}
        closeFn={closeFn}
        showCollectionsFn={() => setShowCollectionMenu(true)}
      />
      {/* 
      The CollectionMenu component which is displayed conditionally 
      based on the showCollectionMenu state 
      */}
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
