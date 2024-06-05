import ItemDetailsPage from "@/components/tabs/Home/ItemDetailsPage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import getItemObjById from "../../../utils/getItemObjById";
import redirect from "@/utils/redirect";

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
    redirect("/");
  }

  if (!itemObj) return null;
  return <ItemDetailsPage itemObj={itemObj} closeFn={closeDetailsPage} />;
}
