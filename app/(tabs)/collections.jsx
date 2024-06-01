import Collections from "../../components/tabs/Collections/Collections";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useEffect, useState } from "react";
import getCollections from "@/utils/getCollections";

export default function CollectionScreen() {
  const { sessionExists, session } = useSession();
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    getCollections(session).then((collections) => setCollections(collections));
  }, [session]);

  if (!sessionExists) return <Auth />;
  return <Collections collectionsProp={collections} />;
}
