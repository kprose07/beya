import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./splash"; // Adjust path as needed
import Process from "./process"; // Adjust path as needed
import MyDrawer from "./drawer"; // Import MyDrawer

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={MyDrawer} />
      <Stack.Screen name="Process" component={Process} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
}
