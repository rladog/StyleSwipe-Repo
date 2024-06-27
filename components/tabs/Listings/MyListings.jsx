import EditableSingleCollection from "@/components/tabs/Collections/EditableSingleCollection";
import redirect from "@/utils/common/redirect";
export default function MyListings({ listingsData, deleteFn }) {
  return (
    <EditableSingleCollection
      collectionName={"My Listings"}
      collectionData={listingsData}
      deleteFn={deleteFn}
      tapFn={(id) => redirect(`/itemDetail/${id}`)}
    />
  );
}
