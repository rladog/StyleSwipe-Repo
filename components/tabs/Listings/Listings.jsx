import { StyleSheet, View, Text, Pressable } from "react-native";
import redirect from "@/utils/common/redirect";

/*
Component to be displayed on the Listings tab

Contains two buttons - 
One for redirecting the user to create a new listing
One for redirecting the user to see and edit the listings they've created
*/

export default function Listings() {
  return (
    <View style={styles.container} testID="listings-container">
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Listings</Text>
      </View>
      <View style={styles.optionsContainer}>
        {/* Button for redirecting users to a "new listing" tab */}
        <Pressable
          style={styles.optionItem}
          onPress={() => redirect("/listings/newListing")}
        >
          <Text style={styles.optionText}>Create new listing</Text>
        </Pressable>

        {/* Button for redirecting users to a tab containing their listings*/}
        <Pressable
          style={styles.optionItem}
          onPress={() => redirect("/listings/myListings")}
        >
          <Text style={styles.optionText}>View my listings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 247)",
    alignItems: "center",
    justifyContent: "space-between",
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
  optionsContainer: {
    marginTop: "32%",
    width: "90%",
    // borderWidth: 2,
    // borderColor: "black",
    justifyContent: "center",
    gap: 50,
    height: "80%",
  },
  optionItem: {
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    marginBottom: "5%",
    height: 100,
  },
  optionText: {
    textAlign: "center",
    // borderWidth: 2,
    // borderColor: "black",
    fontFamily: "Satoshi-Regular",
    fontSize: 28,
  },
});
