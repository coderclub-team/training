import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { api } from "@/store/api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import "../styles.css";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PlayfairDisplayBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
    PlayFairDisplayRegular: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayFairDisplayMedium: require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayFairDisplayItalic: require("../assets/fonts/PlayfairDisplay-Italic.ttf"),
    PlayFairDisplayBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    PlayFairDisplaySemiBold: require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayFairDisplayBoldItalic: require("../assets/fonts/PlayfairDisplay-BoldItalic.ttf"),
    PlayFairDisplaySemiBoldItalic: require("../assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ApiProvider api={api}>
        <Stack>
          <Stack.Screen name="+not-found" />
        </Stack>
      </ApiProvider>
    </ThemeProvider>
  );
}
