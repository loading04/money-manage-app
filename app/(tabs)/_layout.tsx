
import { Tabs } from 'expo-router'
import { ChartColumnIncreasing, House, Settings, Wallet } from 'lucide-react-native'
import { COLORS } from '../constants/theme'
export default function TabLayout(){

    return (
      <Tabs 
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:COLORS.clicked,
        

      }}>
        <Tabs.Screen 
        name='index'
        options={{
          headerShown:false,
          tabBarIcon:({ focused, color, size })=> <House color={color} />,
        }}
        />

        <Tabs.Screen 
        name='transactions'
        options={{
          headerShown:false,
          tabBarIcon:({ focused, color, size })=> <Wallet  color={color}/>,

        }}
        />

        <Tabs.Screen 
        name='budgets'
        options={{
          headerShown:false,
          tabBarIcon:({ focused, color, size })=> <ChartColumnIncreasing color={color}/>,
        }}
        />

        <Tabs.Screen 
        name='settings'
        options={{
          headerShown:false,
          tabBarIcon:({ focused, color, size })=> <Settings color={color}/>,
        }}
        />
      </Tabs>
    )
  
}
