import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import Splash from "./splash";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Fallback screen for unmatched routes
function NotFoundScreen() {
  return <Text>Screen Not Found</Text>;
}

// // Drawer Navigator Setup
// function MyDrawer() {
//   return (
//     <Drawer.Navigator screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="NotFound" component={NotFoundScreen} />
//     </Drawer.Navigator>
//   );
// }

// Stack Navigator Setup without NavigationContainer
export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
}
