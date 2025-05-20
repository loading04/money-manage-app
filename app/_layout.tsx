import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">


      <Stack>
        <Stack.Screen name="index" 
        options={{title:"Home",
        headerShown:false}} />

        <Stack.Screen name="settings" 
        options={{title:"Home",
        headerShown:false}} />
      </Stack>

      </SafeAreaView>
    </SafeAreaProvider>

  );
}
