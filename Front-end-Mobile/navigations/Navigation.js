import React from "react";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Services from "../screens/Services"; 

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
   
  return (
    <Stack.Navigator initialRouteName='home' screenOptions=
    {{headerShown:false}} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Services" component={Services} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;


