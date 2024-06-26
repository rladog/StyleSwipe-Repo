import { Text, View } from "react-native";
import ExploreList from "@/components/tabs/Explore/Explore";
import ExploreLink from "@/components/tabs/Explore/ExploreLink";
export default function ExploreScreen() {
  return (
    <ExploreList>
      <ExploreLink
        explorePageName={"All user listings"}
        explorePageLink={"/explore/allListings"}
        imageURL={
          "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <ExploreLink
        explorePageName={"AI recommendations"}
        explorePageLink={"/"}
        imageURL={
          "https://images.pexels.com/photos/7679875/pexels-photo-7679875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
    </ExploreList>
  );
}
