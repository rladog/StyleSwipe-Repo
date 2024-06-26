import useSession from "@/hooks/useSession";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import removeItemFromListings from "@/utils/listings/removeItemFromListings";
import getListings from "@/utils/listings/getListings";
import MyListings from "@/components/tabs/Listings/MyListings";

export default function Listings() {
  const { sessionExists, session } = useSession();
  const [listings, setListings] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getListings().then((listings) => setListings(listings));
    }, [session])
  );

  // if (!sessionExists) return <Auth />;
  return (
    <MyListings
      listingsData={listings}
      deleteFn={(itemId, collectionName) => removeItemFromListings(itemId)}
    />
  );
}
