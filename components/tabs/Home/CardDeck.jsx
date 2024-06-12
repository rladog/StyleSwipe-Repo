import Swiper from "react-native-deck-swiper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ItemCard from "../_common/ItemCard";
import ItemDetails from "@/components/tabs/Home/ItemDetails";

export default function CardDeck({
  cards,
  swipeRightFn,
  swipeLeftFn,
  doubleTapFn,
  session,
}) {
  //State for managing if the card has been double tapped or not
  const [taps, setTaps] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
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
        onSwipedRight={(index) => swipeRightFn(cards[index])}
        onSwipedLeft={(index) => swipeLeftFn(cards[index])}
        onTapCard={(index) => {
          //On the first tap, set number of taps to 1
          if (taps == 0) {
            setTaps(1);
            return;
          }
          //On the second tap,
          //call the double tap function
          //and set the number of taps to zero
          if (taps == 1) {
            setCurrentIndex(index);
            doubleTapFn(cards[index]);
            setTaps(0);
          }
        }}
        //Reset the tap counter
        //if the card has been moved by more than 50 units
        onSwiping={(x, y) => {
          if (x > 50 || x < -50) setTaps(0);
        }}
        containerStyle={styles.swiperContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    // marginTop: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 247)",
    position: "absolute",
    zIndex: -4,
  },
});
