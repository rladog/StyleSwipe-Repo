import EditableSingleCollection from "@/components/tabs/Collections/EditableSingleCollection";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import getSingleCollection from "@/utils/collections/getSingleCollection";
import removeItemFromCollection from "@/utils/collections/removeItemFromCollection";
import redirect from "@/utils/common/redirect";

export default function Collection() {
  const { collectionName } = useLocalSearchParams();
  const { sessionExists, session } = useSession();
  const [singleCollection, setSingleCollection] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getSingleCollection(collectionName).then((collection) =>
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
        removeItemFromCollection(itemId, collectionName)
      }
      tapFn={(id) => redirect(`/itemDetail/${id}`)}
    />
  );
}
