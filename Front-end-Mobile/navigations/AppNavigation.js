import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import  Homebackground  from '../screens/Homebackground';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Main'
      >
        <Stack.Screen name='Main' component={DrawerNavigation} />
         
      </Stack.Navigator>
    );
    
    }

export default AppNavigation