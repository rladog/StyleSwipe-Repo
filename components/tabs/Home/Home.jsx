import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import CardDeck from "@/components/tabs/Home/CardDeck";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import useFontImport from "@/hooks/useFontImport";
import addItemToCollection from "@/utils/addItemToCollection";

export default function Home({ cardProp, session }) {
  const { fontsReady } = useFontImport();
  //Store cards retrieved from database as state
  const [cards, setCards] = useState(cardProp);

  useEffect(() => {
    setCards(cardProp);
  }, [cardProp]);

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <>
      {cards && (
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.titleText}>Swipe!</Text>
          </View>
          {cards && (
            <CardDeck
              session={session}
              cards={cards}
              swipeRightFn={(item) =>
                addItemToCollection(item.ProductId, "Liked Items")
              }
              swipeLeftFn={(item) => null}
            />
          )}
        </View>
      )}
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
