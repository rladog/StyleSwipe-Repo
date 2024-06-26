import { Image, Pressable, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { Text } from "react-native";
export default function ExploreLink({
  imageURL,
  explorePageName,
  explorePageLink,
}) {
  return (
    <Link href={explorePageLink} asChild>
      <Pressable style={styles.container}>
        <View style={styles.wallpaperOpacity}></View>
        <Image source={{ uri: imageURL }} style={styles.wallpaper}></Image>
        <Text style={styles.explorePageName}>{explorePageName}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "91%",
    height: 130,
    justifyContent: "flex-end",
    borderRadius: 15,
    overflow: "hidden",
    margin: "3%",
  },
  wallpaperOpacity: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    borderWidth: 2,
  },
  wallpaper: {
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    zIndex: 1,
    borderRadius: 15,
  },
  explorePageName: {
    zIndex: 3,
    color: "white",
    fontFamily: "Satoshi-Light",
    fontSize: 30,
    marginBottom: "3%",
    marginLeft: "5%",
  },
});
