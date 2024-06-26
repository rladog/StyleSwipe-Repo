import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import ItemCard from "@/components/tabs/_common/ItemCard"; // Import the ItemCard component

/*
The main component to be displayed on the cart tab

Takes in the collection name,
an array of item objects in that collection,
and a callback function to be called when an item is deleted from collection
*/

export default function Cart({ cartData, deleteFromCartFn, purchaseItemFn }) {
  //State to store the data of the collection
  const [cart, setCart] = useState(cartData);

  //State to store if the user is in the midst of a purchase
  const [purchaseMode, setPurchaseMode] = useState(false);

  /*
  Call useEffect every time the "cartData" prop changes
  to update state accordingly
  */
  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  //Function for updating the "cart" state
  //to remove the item passed in as argument
  const removeItemFromState = (targetItem) => {
    console.log("filtering");
    const newCart = cart.filter(
      (item) => item.ProductId != targetItem.ProductId
    );
    console.log(cart);
    console.log(newCart);
    setCart(newCart);
  };

  //Function for deleting an item
  const handleConfirmDelete = (deletedItem) => {
    //Call the deleteFromCart callback function
    deleteFromCartFn(deletedItem);

    //Remove the deleted item from the current "cart" state accordingly
    removeItemFromState(deletedItem);
  };

  //Function for purchasing the item
  const handleConfirmPurchase = (selectedItem) => {
    //Call the purchaseItem callback function
    purchaseItemFn(selectedItem);

    //Remove the selected item from the current "cart" state accordingly
    removeItemFromState(selectedItem);
  };

  //Function to display each items in the cart
  //using the ItemCard component
  const renderItem = ({ item }) => (
    <View
      style={{
        marginHorizontal: "1.5%",
        width: "97%",
        height: 135,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "black",
        marginVertical: 15,
        alignItems: "center",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgb(255, 255, 247)",
      }}
    >
      <ItemCard
        height={"100%"}
        width={"30%"}
        gradientHeight={1}
        imageURL={item.ImageURL}
        name={null}
        nameSize={0}
      />
      <View
        style={{
          borderLeftWidth: 2,
          width: "70%",
          height: "100%",
          backgroundColor: "rgb(255, 255, 247)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingHorizontal: 5,
            fontFamily: "Satoshi-Regular",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {item.ProductTitle}
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            onPress={() => handleConfirmDelete(item)}
            style={{
              borderWidth: 2,
              borderColor: "black",
              backgroundColor: "rgb(255, 255, 247)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                padding: 5,
                fontFamily: "Satoshi-Bold",
                textAlign: "center",
              }}
            >
              Remove
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleConfirmPurchase(item)}
            style={{
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                padding: 5,
                fontFamily: "Satoshi-Bold",
                color: "rgb(255, 255, 247)",
                textAlign: "center",
              }}
            >
              Purchase
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container} testID="cart-container">
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Cart</Text>
      </View>
      <FlatList
        testID="cart-item-list"
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.ProductId}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
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
    fontSize: 40,
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: "4%",
  },
  deleteToggleText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 22,
  },
  cancelDeleteText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 22,
  },
});
