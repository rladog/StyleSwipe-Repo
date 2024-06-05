import ItemDetails from "@/components/tabs/Home/ItemDetails";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

export default function Collection() {
  const { collectionName } = useLocalSearchParams();
  const { sessionExists, session } = useSession();
  const [singleCollection, setSingleCollection] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getSingleCollection(session, collectionName).then((collection) =>
        setSingleCollection(collection)
      );
    }, [session, collectionName])
  );

  // if (!sessionExists) return <Auth />;
  return (
    <EditableSingleCollection
      collectionName={collectionName}
      collectionData={singleCollection}
      deleteFn={(itemId, collectionName) =>
        removeItemFromCollection(session, itemId, collectionName)
      }
    />
  );
}
