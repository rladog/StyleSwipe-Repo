import { StyleSheet, View, Text } from "react-native";
import CardDeck from "@/components/tabs/Home/CardDeck";
import { useEffect, useState } from "react";
export default function Home({
  cardProp,
  swipeLeftFn,
  swipeRightFn,
  doubleTapFn,
}) {
  //Store cards retrieved from database as state
  const [cards, setCards] = useState(cardProp);

  useEffect(() => {
    setCards(cardProp);
  }, [cardProp]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Swipe!</Text>
        </View>
        {cards && (
          <CardDeck
            cards={cards}
            swipeRightFn={(item) => swipeRightFn(item)}
            swipeLeftFn={(item) => swipeLeftFn(item)}
            doubleTapFn={(item) => doubleTapFn(item)}
          />
        )}
      </View>
    </>
  );
}

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
    zIndex: 14,
    height: "14%",
    textAlignVertical: "center",
    alignItems: "flex-end",
    paddingLeft: "4%",
    marginBottom: "4%",
    textAlignVertical: "bottom",
    position: "absolute",
    zIndex: 1,
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
});
