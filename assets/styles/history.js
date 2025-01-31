// HomeStyle.js
import { StyleSheet } from "react-native";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";

export default StyleSheet.create({
  his_contain: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  his_colOne: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginLeft: "5%",
    justifyContent: "flex-start",
    marginTop: "15%",
    position: "absolute",
    zIndex: 1,
  },
  his_two_contain: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    flexDirection: "column",
  },
  his_colTwoT: {
    marginTop: "10%",
    fontFamily: "Fredoka_400Regular",
    fontSize: 25,
    margin: 0,
    padding: 0,
    alignSelf: "flex-start",
    marginLeft: "10%",
    position: "relative",
  },
  his_colTwo: {
    width: "80%",
    height: "70%",
    position: "relative",
    marginTop: 10,
    borderColor: "rgba(43, 48, 58, 0.2)",
    borderStyle: "dashed",
    borderWidth: 2,
    padding: 20,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  his_colTwop: {
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
    fontSize: 18,
  },
});
