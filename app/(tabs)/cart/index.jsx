import Cart from "@/components/tabs/Cart/Cart";
import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import getItemsFromCart from "@/utils/cart/getItemsFromCart";
import removeItemFromCart from "@/utils/cart/removeItemFromCart";

export default function CartScreen() {
  const [cartData, setCartData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getItemsFromCart().then((cartData) => setCartData(cartData));
    }, [])
  );
  return (
    <Cart
      cartData={cartData}
      deleteFromCartFn={(item) => removeItemFromCart(item.ProductId)}
      purchaseItemFn={(item) => alert(`Purchased ${item.ProductTitle}`)}
    />
  );
}
