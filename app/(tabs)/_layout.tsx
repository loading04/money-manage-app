
import { Tabs } from 'expo-router';
import { ChartColumnIncreasing, House, Settings, Wallet } from 'lucide-react-native';
import { Platform, SafeAreaView } from "react-native";
import { COLORS } from '../constants/theme';
export default function TabLayout() {

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.clicked,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          height: Platform.OS === "ios" ? 40 : 60,
          paddingBottom: Platform.OS === "ios" ? 8 : 5,
          paddingTop: 6,
        },
      }}
    >
        <Tabs.Screen
          name='index'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <House color={color} />,
          }}
        />

        <Tabs.Screen
          name='transactions'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <Wallet color={color} />,

          }}
        />

        <Tabs.Screen
          name='budgets'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <ChartColumnIncreasing color={color} />,
          }}
        />

        <Tabs.Screen
          name='settings'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <Settings color={color} />,
          }}
        />
      </Tabs>

  )

}
