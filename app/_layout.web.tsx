import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import BrandWeb from "@/components/Brand.web";
import NavbarWeb from "@/components/Navbar.web";
import { useColorScheme } from "@/hooks/useColorScheme";
import { api } from "@/store/api";
import { Drawer } from "expo-router/drawer";
import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../styles.css";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // Define a breakpoint for larger screens
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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerLeft: isLargeScreen ? () => null : undefined,
              headerRight: isLargeScreen ? () => <NavbarWeb /> : undefined,
              headerShown: true,
              headerTitle: () => (isLargeScreen ? <BrandWeb /> : undefined),
              headerTitleStyle: {
                fontFamily: "PlayfairDisplayItalic",
                fontSize: 24,
              },
              headerStyle: {
                backgroundColor: "purple",
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="about" />
            <Stack.Screen name="+not-found" />
          </Drawer>
        </GestureHandlerRootView>
      </ApiProvider>
    </ThemeProvider>
  );
}
