import React from 'react';
import { Text, Platform, View } from 'react-native';

import Contrat from '../screens/Contrat' 
import Reclamation from '../screens/Reclamation'; 
import Sinistre from '../screens/Sinistre'; 
import SideBar from '../screens/SideBar'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Contacts from '../screens/Contacts'; 


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}
const BottomTabNavigation = (props) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>

      <Tab.Screen 
        name="Contrat" 
        component={Contrat} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
            <AntDesign name="filetext1" size={24} color="#EF4444" />
              <Text style={{ fontSize: 12, color: "#EF4444" }}>Contrat</Text> 
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Reclamation" 
        component={Reclamation} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <Ionicons name="settings" size={24} color={focused ? "#EF4444" : "#EF4444"} />
              <Text style={{ fontSize: 12, color: "#EF4444" }}>Demande</Text>
            </View>
          )
        }}
      />
<Tab.Screen 
        name="SideBar" 
        component={SideBar} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EF4444",
                width: Platform.OS == "ios" ? 50 : 60,
                height: Platform.OS == "ios" ? 50 : 60,
                top: Platform.OS == "ios" ? -10 : -20,
                borderRadius: Platform.OS == "ios" ? 25 : 30
              }}
            >
              <AntDesign name="plus" size={24} color="#FFF" />
            </View>
          )
        }}
      />
<Tab.Screen
        name="Sinistre" 
        component={Sinistre}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#EF4444" : "#EF4444"} />
              <Text style={{ fontSize: 12, color: "#EF4444" }}>Sinistre</Text> 
            </View>
          )
        }}
      />
         <Tab.Screen 
        name="Contacts" 
        component={Contacts} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <AntDesign name="customerservice" size={24} color="#EF4444" />
              <Text style={{ fontSize: 12, color: "#EF4444" }}>Contacts</Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}; 
export default BottomTabNavigation;
