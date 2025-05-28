import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light"><SafeAreaProvider>
        <SafeAreaView className="flex-1">
        <Stack screenOptions={{headerShown:false}}/>
        </SafeAreaView>
      </SafeAreaProvider></GluestackUIProvider>
  );
}
