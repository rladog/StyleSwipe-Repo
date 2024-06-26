import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Pressable } from "react-native";

/*
Component to render individual collections
shown in the Collections tab

Takes in the name of the collection
and a callback function to be called when the collection is pressed
*/

export default function CollectionItem({ name, onPressFn }) {
  return (
    <Pressable
      style={styles.collectionItem}
      onPress={onPressFn}
      testID="collection-item"
    >
      <Text style={styles.collectionItemText}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  collectionItem: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    width: "45%",
    height: 100,
    textAlign: "center",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionItemLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    height: "100%",
  },
  collectionItemText: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
});
