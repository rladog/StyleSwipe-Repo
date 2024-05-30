import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import CardDeck from "@/components/tabs/Home/CardDeck";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function Home() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  //Store cards retrieved from database as state
  const [cards, setCards] = useState(null);

  //Use useEffect to get the cards from the database
  //when the page first loads
  useEffect(() => {
    const getCards = async () => {
      //Get all the rows from table "items" in the database
      const { data, error } = await supabase.from("items").select();

      //If there was an error fetching the data
      //report the user of the error
      if (error) {
        alert("Error while fetching database");
        console.log(error);
        return;
      }

      //If data was successfully retrieved,
      //set the card to the retrieved data
      //which is an array containing each row as an object
      if (data) {
        setCards(data);
        console.log(data[0]);
        return;
      }
    };
    getCards();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Swipe!</Text>
      </View>
      {cards && <CardDeck cards={cards} />}
    </View>
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
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
});
