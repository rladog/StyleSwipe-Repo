import { Link } from "expo-router";
import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useFonts } from "expo-font";

import AdjustableCard from "@/components/page_components/AdjustableCard";
import ItemDetails from "@/components/page_components/home/ItemDetails";
import itemData from "@/assets/data/cards";
import { supabase } from "@/utils/supabase";
import saveLikedItemId from "@/utils/saveLikedItemId2";

const App = () => {
  //State for the index of the current item
  const [currentItemId, setCurrentItemId] = useState(0);

  //State for whether the detail of the current item is open
  const [detailsOpen, setDetailsOpen] = useState(false);

  //State for managing if the card has been double tapped or not
  const [taps, setTaps] = useState(1);

  //Get the cards from the Supabase database and save it as state
  const [cards, setCards] = useState(itemData);

  useEffect(() => {
    const getCards = async () => {
      const { data, error } = await supabase.from("items").select();

      if (error) {
        alert("error");

        alert("Error while fetching database");
        return;
      }

      if (data) {
        console.log(data[0]);
        console.log(data[0]["ImageURL"]);

        setCards(data);
        return;
      }
    };
    getCards();
  }, []);

  return (
    <View style={styles.container}>
      {/* 
      Title and filter on the top of the page 
      */}
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Swipe!</Text>
        <Pressable style={styles.filterPressable} onPress={() => alert("hi")}>
          <Text style={styles.filterText}>filter</Text>
        </Pressable>
      </View>

      {/* 
      Swipable cards holder 
      */}
      <Swiper
        verticalSwipe={false}
        cards={cards}
        renderCard={(card) => (
          <AdjustableCard
            item={card}
            height={"90%"}
            gradientHeight={0.6}
            nameSize={36}
            descSize={20}
          />
        )}
        onSwiping={(x, y) => {
          if (x > 50 || x < -50) setTaps(0);
        }}
        onSwipedLeft={(i) => {
          console.log("Disliked item " + i);
          setTaps(0);
        }}
        onSwipedRight={(i) => {
          console.log(cards[i].ProductTitle);
          saveLikedItemId(1, "Liked Items", cards[i].ProductId);
          setTaps(0);
        }}
        cardHorizontalMargin={0}
        cardVerticalMargin={0}
        cardIndex={0}
        onTapCard={(i) => {
          if (taps == 0) {
            setTaps(1);
            return;
          }
          if (taps == 1) {
            setTaps(0);
            setDetailsOpen(true);
            setCurrentItemId(i);
          }
        }}
        stackSeparation={0}
        stackScale={0}
        stackSize={2}
        infinite={true}
        containerStyle={styles.swiperContainer}
      />

      {/* 
      Modal to be displayed when double tapping an item
      displaying item details 
      */}
      <ItemDetails
        currentItemId={currentItemId}
        closeFunction={() => setDetailsOpen(false)}
        isVisible={detailsOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "flex-start",
  },

  //Styling for heading containing the title and the filter icon
  headingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    // top: "5%",
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    // borderColor: "black",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },

  filterPressable: {},

  filterText: {
    marginTop: "20%",
    fontFamily: "Satoshi-Bold",
    fontSize: 24,
    marginRight: "2%",
  },

  //Styling for the swiping cards container
  swiperContainer: {
    // marginTop: 50,
    width: "50%",
    height: "50%", // Adjust this to change how much of the screen the cards fill
    backgroundColor: "green", // For debugging: shows the swiper container background
  },
});

export default App;
