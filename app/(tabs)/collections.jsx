import Collections from "../../components/tabs/Collections/Collections";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useCallback, useEffect, useState } from "react";
import getCollections from "@/utils/getCollections";
import { useFocusEffect } from "expo-router";

export default function CollectionScreen() {
  const { sessionExists, session } = useSession();
  const [collections, setCollections] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getCollections(session).then((collections) =>
        setCollections(collections)
      );
      console.log("hi");
    }, [session])
  );

  if (!sessionExists) return <Auth />;
  return <Collections collectionsProp={collections} />;
}
