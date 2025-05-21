
import { Tabs } from 'expo-router'
import { ChartColumnIncreasing, House, Settings, Wallet } from 'lucide-react-native'
export default function TabLayout(){

    return (
      <Tabs 
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        

      }}>
        <Tabs.Screen 
        name='index'
        options={{
          headerShown:false,
          tabBarIcon:()=> <House />,
        }}
        />

        <Tabs.Screen 
        name='transactions'
        options={{
          headerShown:false,
          tabBarIcon:()=> <Wallet  />,

        }}
        />

        <Tabs.Screen 
        name='budgets'
        options={{
          headerShown:false,
          tabBarIcon:()=> <ChartColumnIncreasing   />,
        }}
        />

        <Tabs.Screen 
        name='settings'
        options={{
          headerShown:false,
          tabBarIcon:()=> <Settings   />,
        }}
        />
      </Tabs>
    )
  
}
