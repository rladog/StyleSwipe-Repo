import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function CollectionItem({ href, name }) {
  return (
    <View style={styles.collectionItem}>
      <Link href={href} style={styles.collectionItemLink}>
        <Text style={styles.collectionItemText}>{name}</Text>
      </Link>
    </View>
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
    textAlignVertical: "center",
  },
  collectionItemText: {
    width: "100%",
    height: "100%",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    display: "flex",
    flex: 1,
  },
});
