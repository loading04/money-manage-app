
import { Tabs } from 'expo-router'

export default function TabLayout(){

    return (
      <Tabs screenOptions={{headerShown:false

      }}>
        <Tabs.Screen 
        name='index'
        options={{headerShown:false}}
        />
        <Tabs.Screen 
        name='budgets'
        options={{headerShown:false}}
        />
        <Tabs.Screen 
        name='transactions'
        options={{headerShown:false}}
        />
        <Tabs.Screen 
        name='settings'
        options={{headerShown:false}}
        />
      </Tabs>
    )
  
}
