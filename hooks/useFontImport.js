import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function useFontImport() {
  SplashScreen.preventAutoHideAsync(); // Prevent auto-hiding the splash screen initially

  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
  });

  // Handle the logic to hide the splash screen based on font loading
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      onLayoutRootView(); // Call the function to potentially hide the splash screen
    }
  }, [fontsLoaded, fontError, onLayoutRootView]);

  return { fontsReady: fontsLoaded || fontError };
}
