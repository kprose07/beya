import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./splash"; // Adjust path as needed
import Home from "./home";     // Adjust path as needed
import History from "./history"; // Adjust path as needed
import Process from "./process"; // Adjust path as needed

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="History" component={History} />
      <Stack.Screen name="Process" component={Process} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <MyStack />
 
  );
}
