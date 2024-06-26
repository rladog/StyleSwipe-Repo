import Profile from "@/components/tabs/Profile/Profile";
import useSession from "@/hooks/useSession";
import Auth from "@/components/tabs/_common/Auth";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  // if (!sessionExists) return <Auth />;
  return <Profile />;
}
