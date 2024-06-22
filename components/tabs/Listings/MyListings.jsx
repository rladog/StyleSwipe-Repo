import EditableSingleCollection from "@/components/tabs/Collections/EditableSingleCollection";

export default function MyListings({ listingsData, deleteFn }) {
  return (
    <EditableSingleCollection
      collectionName={"My Listings"}
      collectionData={listingsData}
      deleteFn={deleteFn}
    />
  );
}
