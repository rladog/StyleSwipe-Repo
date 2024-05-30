import Swiper from "react-native-deck-swiper";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CardDeck() {
  const [cards, setCards] = useState([]);

  return <Swiper cards={cards} />;
}

const styles = StyleSheet.create({
  swiperContainer: {
    // marginTop: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 247)",
  },
});
