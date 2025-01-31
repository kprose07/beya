import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import Home from "./home"; // Adjust path as needed
import History from "./history"; // Adjust path as needed
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      {/* Drawer Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/TARWS.png")} style={styles.profileImage} />
        <Text style={styles.headerText}>Welcome!</Text>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }} // Prevents content from pushing footer off-screen
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Image source={require("../../assets/images/TARW.png")} style={styles.footerImage} />
      </View>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerStyle,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#aaa",
        drawerActiveBackgroundColor: "#2B303A",
        drawerItemStyle: styles.drawerItem,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#1B1F23", // Dark mode background
    flex: 1,
  },
  header: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B303A",
    paddingTop: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 0,
    marginBottom: 10,
    resizeMode: "contain", // Prevents clipping

  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerStyle: {
    backgroundColor: "#1B1F23", // Dark mode background
    width: 250, // Drawer width
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  drawerItem: {
    marginVertical: 5,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: "#2B303A",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    height:220,
  },
  footerImage: {
    width: 150, // Bigger image
    height: 150,
    resizeMode: "contain", // Prevents clipping
  },
});
