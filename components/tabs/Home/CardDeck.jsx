import Swiper from "react-native-deck-swiper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ItemCard from "../_common/ItemCard";

export default function CardDeck({ swipeRightFn }) {
  const [cards, setCards] = useState([]);

  return (
    <Swiper
      cards={cards}
      renderCard={(card) => (
        //Render the cards using the ItemCard component
        //Gradient height should be a fraction between 0 and 1 based on how fast the gradient should start
        <ItemCard
          height={"90%"}
          width={"100"}
          gradientHeight={0.6}
          imageURL={
            "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
          }
          name={"Name"}
          nameSize={36}
        />
      )}
      cardVerticalMargin={0}
      cardHorizontalMargin={0}
      onSwipedRight={(index) => swipeRightFn(index)}
    />
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    // marginTop: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 247)",
  },
});
