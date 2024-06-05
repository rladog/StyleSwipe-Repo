import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import useFontImport from "@/hooks/useFontImport";
import { Pressable } from "react-native";

export default function CollectionItem({ href, name }) {
  const { fontsReady } = useFontImport();
  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }
  return (
    <Link href={href} style={styles.collectionItemLink} asChild>
      <Pressable style={styles.collectionItem}>
        <Text style={styles.collectionItemText}>{name}</Text>
      </Pressable>
    </Link>
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
