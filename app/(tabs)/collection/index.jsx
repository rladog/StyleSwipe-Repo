import Collections from "../../../components/tabs/Collections/Collections";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useCallback, useEffect, useState } from "react";
import getCollections from "@/utils/getCollections";
import { useFocusEffect } from "expo-router";
import LoadingScreen from "@/components/tabs/_common/LoadingScreen";

export default function CollectionScreen() {
  const { sessionExists, session } = useSession();
  const [collections, setCollections] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getCollections().then((collections) => setCollections(collections));
    }, [session])
  );

  // if (!sessionExists) return <Auth />;
  if (!collections) {
    return <LoadingScreen loadingText={"Loading collections..."} />;
  }
  return <Collections collectionsProp={collections} />;
}
