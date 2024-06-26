import Home from "@/components/tabs/Home/Home";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useEffect, useState } from "react";
import getCards from "@/utils/home/getCards";
import LoadingScreen from "@/components/tabs/_common/LoadingScreen";
import addItemToCollection from "@/utils/collections/addItemToCollection";
import redirect from "@/utils/common/redirect";
import useFontImport from "@/hooks/useFontImport";

export default function HomeScreen() {
  const { sessionExists, session } = useSession();
  const [cards, setCards] = useState(null);
  useFontImport();

  useEffect(() => {
    getCards().then((cards) => setCards(cards));
  }, [session]);

  if (!sessionExists) return <Auth />;

  if (!cards) {
    return <LoadingScreen loadingText={"Loading items..."} />;
  }
  return (
    <Home
      cardProp={cards}
      swipeRightFn={(item) =>
        addItemToCollection(item.ProductId, "Liked Items")
      }
      swipeLeftFn={(item) => null}
      doubleTapFn={(item) => redirect(`/itemDetail/${item.ProductId}`)}
    />
  );
}
