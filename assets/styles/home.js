// HomeStyle.js
import { StyleSheet } from "react-native";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";

export default StyleSheet.create({
  h_container: {
    flex: 1,
    backgroundColor: "#FFF", // fallback if the camera fails
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  h_colOne: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    justifyContent: "flex-start",
    marginTop: "8%",
    position: "absolute",
    zIndex: 1,
  },
  q_img: {
    marginLeft: "auto",
  },
  menu_img: {},
  h_colTwo: {
    flex: 1,
  },
  h_colThree: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    position: "absolute",
    padding: 25,
    columnGap: 28,
    zIndex: 1,
  },
  scan: {
    width: 60,
    height: 60,
  },
  flashlight: {
    width: 60,
    height: 60,
  },
  history: {
    width: 60,
    height: 60,
  },
  how_to: {
    width: "80%",
    height: "65%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 30,
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    top: "15%",
    rowGap: 20,
    borderWidth: 1,
    borderColor: "rgb(135, 135, 135)",
    backgroundColor: "#FFFFFF",
  },
  how_title: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
    fontSize: 36,
  },
  how_rone: {
    display: "flex",
    flexDirection: "column",
  },
  how_subt: {
    fontSize: 20,
    color: "#000",
    fontWeight: 200,
    width: "100%",
    textAlign: "center",
  },
  how_qTAR: {
    fontSize: 36,
    color: "#FE2B27",
    fontWeight: 800,
    width: "100%",
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
  },
  how_rtwo: {
    display: "flex",
    flexDirection: "column",
  },
  how_iTAR: {
    fontSize: 36,
    color: "#F57ECB",
    fontWeight: 800,
    width: "100%",
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
  },
  how_rthree: {
    display: "flex",
    flexDirection: "column",
  },
  how_cTAR: {
    fontSize: 36,
    color: "#1652C9",
    fontWeight: 800,
    width: "100%",
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});
