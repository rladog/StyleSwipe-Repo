import ItemDetailsPage from "@/components/tabs/Home/ItemDetailsPage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import getItemObjById from "@/utils/common/getItemObjById";
import LoadingScreen from "@/components/tabs/_common/LoadingScreen";
import redirectToSeller from "@/utils/common/redirectToSeller";
import addItemToCart from "@/utils/cart/addItemToCart";
import { router } from "expo-router";

export default function itemDetail() {
  const { itemId } = useLocalSearchParams();
  console.log(itemId);
  const [itemObj, setItemObj] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getItemObjById(itemId).then((obj) => setItemObj(obj));
    }, [itemId])
  );

  function closeDetailsPage() {
    setItemObj(null);
    router.back();
  }

  if (!itemObj) {
    return <LoadingScreen loadingText={"Loading details..."} />;
  }
  return (
    <ItemDetailsPage
      itemObj={itemObj}
      closeFn={closeDetailsPage}
      sellerFn={(itemObj) =>
        redirectToSeller(
          itemObj.is_listing,
          itemObj.seller_contact,
          itemObj.ProductTitle,
          "https://nus.edu.sg/"
        )
      }
      cartFn={(itemObj) => addItemToCart(itemObj.ProductId)}
    />
  );
}
