import { StyleSheet, View, Text, Image, Modal, Pressable } from "react-native";
import useFontImport from "@/hooks/useFontImport";
import DetailedItemCard from "../_common/DetailedItemCard";
import CollectionMenu from "@/components/tabs/_common/CollectionMenu";
import getCollections from "@/utils/getCollections";
import createCollection from "@/utils/createCollection";
import addItemToCollection from "@/utils/addItemToCollection";
import useSession from "@/hooks/useSession";
import { useEffect, useState } from "react";
import Auth from "../_common/Auth";

export default function ItemDetails({ closeFn, itemObj, isOpen }) {
  const { fontsReady } = useFontImport();
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const { sessionExists, session } = useSession();
  const [collections, setCollections] = useState([{ "Liked Items": [123] }]);

  useEffect(() => {
    getCollections(session).then((collections) => setCollections(collections));
  }, [!sessionExists]);

  if (!fontsReady) {
    return null; // Render nothing while fonts are loading
  }

  if (!sessionExists) {
    return <Auth />;
  }

  return (
    <>
      {isOpen && (
        <Modal>
          <View style={styles.card}>
            <View style={styles.buttonHolder}>
              <Pressable style={styles.closePressable} onPress={closeFn}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
              <Pressable
                style={styles.addPressable}
                onPress={() => setShowCollectionMenu(true)}
              >
                <Text style={styles.addText}>{"Add to \ncollection"}</Text>
              </Pressable>
            </View>

            <DetailedItemCard
              height={"100%"}
              width={"100%"}
              gradientHeight={0.6}
              imageURL={itemObj.ImageURL}
              name={itemObj.ProductTitle}
              nameSize={40}
              gender={itemObj.Gender}
              genderSize={20}
              type={itemObj.ProductType}
              typeSize={20}
              subtype={itemObj.SubCategory}
              subtypeSize={18}
            />
          </View>
        </Modal>
      )}
      <CollectionMenu
        visible={showCollectionMenu}
        itemId={itemObj.ProductId}
        onClose={() => setShowCollectionMenu(false)}
        addToCollectionFn={(itemId, collectionName) =>
          addItemToCollection(session, itemId, collectionName)
        }
        newCollectionFn={(collectionName) =>
          createCollection(session, collectionName)
        }
        collectionsObj={collections}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 247)",
    margin: 0,
  },
  buttonHolder: {
    width: "85%",
    position: "absolute",
    top: "9%",
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closePressable: {},
  closeText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 26,
    textShadowColor: "white",
    textShadowRadius: 5,
  },
  addPressable: {},
  addText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 22,
    textAlign: "center",
    textShadowRadius: 6,
  },
});
