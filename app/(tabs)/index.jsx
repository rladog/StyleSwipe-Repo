import Home from "@/components/tabs/Home/Home";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useEffect, useState } from "react";
import getCards from "@/utils/getCards";

export default function HomeScreen() {
  const { sessionExists, session } = useSession();
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getCards().then((cards) => setCards(cards));
  }, []);

  if (!sessionExists) return <Auth />;
  if (!cards) {
    return <LoadingScreen loadingText={"Loading collections..."} />;
  }
  return <Home cardProp={cards} session={session} />;
}
