import React from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import HistoryStyle from "../../assets/styles/history";

export default function HistoryScreen({ navigation }) {
  return (
    <View style={HistoryStyle.his_contain}>
    <View style={HistoryStyle.his_colOne}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require("../../assets/images/menu.png")} />
      </TouchableOpacity>
    </View>
    <View style={HistoryStyle.his_two_contain}>
      <Text style={HistoryStyle.his_colTwoT}>Inquiries</Text>
      <View style={HistoryStyle.his_colTwo}>
       <Text style={HistoryStyle.his_colTwop}>No Saved Queries Available</Text>

      </View>
    </View>
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
