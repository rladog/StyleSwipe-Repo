import Swiper from "react-native-deck-swiper";
import { useState } from "react";

export default function CardDeck() {
  const [cards, setCards] = useState([]);

  return <Swiper cards={cards} />;
}
