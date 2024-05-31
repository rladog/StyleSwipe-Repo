import { StyleSheet, View, Text } from "react-native";
import CollectionItem from "./CollectionItem";
import { useEffect, useState } from "react";
import useFontImport from "@/hooks/useFontImport";

export default function Collections({ collectionsProp }) {
  const { fontsReady } = useFontImport();
  //Store cards retrieved from database as state
  const [collections, setCollections] = useState(collectionsProp);

  useEffect(() => {
    setCollections(collectionsProp);
  }, [collectionsProp]);

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Collections</Text>
      </View>

      <View style={styles.collectionsHolder}>
        {Object.entries(collections).map((keyValArray) => (
          <CollectionItem
            key={keyValArray[0]}
            href={`/collections/${keyValArray[0]}`}
            name={keyValArray[0]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
  },
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
    fontSize: 40,
  },
  collectionsHolder: {
    flex: 1,
    paddingHorizontal: "6%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
