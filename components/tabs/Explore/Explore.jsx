import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Children, useEffect, useState } from "react";

/*
Component to display the explore page

Takes in a list of children 
and then renders it onto the page 
using a ScrollView for the users to see
*/

function ExploreList({ children }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      testID="new-listing-tab-container"
    >
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Explore</Text>
      </View>
      {children}
    </ScrollView>
  );
}

export default function Explore() {
  return <ExploreList></ExploreList>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 247)",
    minHeight: "100%",
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  headingContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    paddingHorizontal: "5%",
    top: "5%",
    textAlignVertical: "center",
    paddingLeft: "4%",
    marginBottom: "10%",
  },

  titleText: {
    fontFamily: "Satoshi-Black",
    textShadowColor: "white",
    textShadowRadius: 5,
    fontSize: 40,
  },
});
