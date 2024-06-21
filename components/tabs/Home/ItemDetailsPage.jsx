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
          gradientHeight={0.5}
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
      </View>
    </View>
  );
}

export default function ItemDetails({ itemObj, closeFn, sellerFn, cartFn }) {
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
      Button holder at the bottom for users to perform additional actions
      */}
      <View style={buttonStyles.bottomButtonHolder}>
        <Pressable
          style={buttonStyles.bottomButton}
          onPress={() => sellerFn(itemObj)}
        >
          <Text style={buttonStyles.bottomButtonText}>
            {/* 
            Conditionally render text 
            depending on if the seller of the item is another user or a brand 
            */}
            {itemObj.is_listing ? "Contact seller" : "Visit seller site"}
          </Text>
        </Pressable>
        <Pressable style={buttonStyles.bottomButton}>
          <Text
            style={buttonStyles.bottomButtonText}
            onPress={() => cartFn(itemObj)}
          >
            Add to cart
          </Text>
        </Pressable>
      </View>
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
    height: "95%",
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

const buttonStyles = StyleSheet.create({
  bottomButtonHolder: {
    height: "10%",
    // backgroundColor: "rgb(255, 255, 247)",
    position: "absolute",
    zIndex: 5,
    bottom: 0,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomButton: {
    borderWidth: 2,
    borderColor: "black",
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderColor: "rgb(255, 255, 247)",
    borderColor: "black",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "black",
    backgroundColor: "rgb(255,255,247)",
  },
  bottomButtonText: {
    fontFamily: "Satoshi-Black",
    fontSize: 22,
    // color: "rgb(255, 255, 247)",
  },
});
