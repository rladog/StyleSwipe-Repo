import { StyleSheet, View, Text } from "react-native";
import CollectionItem from "./CollectionItem";
import { useEffect, useState } from "react";
import redirect from "@/utils/common/redirect";

/*
Component to display the Collections tab

Takes in an object with keys equal to collection names
and values equal to an array of id of items stored in that collection
*/

export default function Collections({ collectionsProp }) {
  //Store cards retrieved from database as state
  const [collections, setCollections] = useState(collectionsProp);

  //Calls useEffect every time the collection object prop is changed
  //to properly update the state
  useEffect(() => {
    setCollections(collectionsProp);
  }, [collectionsProp]);

  return (
    <>
      {collections && (
        <View style={styles.container} testID="collections-container">
          <View style={styles.headingContainer}>
            <Text style={styles.titleText}>Collections</Text>
          </View>

          {/* 
          Displays the current collections passed in as prop
          by rendering them with the CollectionItem component
          */}
          <View style={styles.collectionsHolder} testID="collections-list">
            {Object.entries(collections).map((keyValArray) => (
              <CollectionItem
                key={keyValArray[0]}
                onPressFn={() => redirect(`/collection/${keyValArray[0]}`)}
                name={keyValArray[0]}
              />
            ))}
          </View>
        </View>
      )}
    </>
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
