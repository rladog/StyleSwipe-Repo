import "react-native-url-polyfill/auto";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import Auth from "@/components/tabs/_common/Auth";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

export default function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return { sessionExists: session != null, session };
}
