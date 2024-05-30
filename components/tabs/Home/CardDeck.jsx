import Swiper from "react-native-deck-swiper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ItemCard from "../_common/ItemCard";

export default function CardDeck({ cards, swipeRightFn }) {
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
          imageURL={card.ImageURL}
          name={card.ProductTitle}
          nameSize={36}
        />
      )}
      //Remove margins from the top and the sides for the cards
      //so that the cards fill up the whole screen
      cardVerticalMargin={0}
      cardHorizontalMargin={0}
      //Disable swiping up or down
      //to prevent unwanted bugs
      verticalSwipe={false}
      //Call the function passed in as prop
      //if the card is swiped right
      //with the given index of the card
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
