import React from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";

export default function HistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require("../../assets/images/menu.png")} />
      </TouchableOpacity>
      <Text>History Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
