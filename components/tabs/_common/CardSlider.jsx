import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ItemCard from "@/components/tabs/_common/ItemCard";
import redirect from "@/utils/common/redirect";

export default function CardSlider({ sliderHeight, cardDataArray }) {
  const [cardArray, setCardArray] = useState(cardDataArray);

  return (
    <>
      <ScrollView
        horizontal={true}
        style={{ ...styles.scrollviewContainer, height: sliderHeight }}
      >
        {cardArray &&
          cardArray.map((itemData) => {
            <Pressable
              style={styles.card}
              onPress={() => redirect(itemData.ProductId)}
            >
              <ItemCard
                height={"100%"}
                width={"100%"}
                gradientHeight={0.5}
                imageURL={itemData.ImageURL}
                name={itemData.ProductTitle}
                nameSize={12}
              />
            </Pressable>;
          })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollviewContainer: {},
  card: {
    height: "100%",
    width: "40%",
  },
});
