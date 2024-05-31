import SingleCollection from "../../../components/tabs/Collections/SingleCollection";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import getSingleCollection from "../../../utils/getSingleCollection";

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

  if (!sessionExists) return <Auth />;
  return (
    <SingleCollection
      collectionName={collectionName}
      collectionData={singleCollection}
    />
  );
}
