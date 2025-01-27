import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#fff",
    padding: 10,
    position: "absolute",
  },
  splash_cont: {
    display: "flex",
    flexDirection: "column", // Align items vertically
    alignItems: "center", // Center children horizontally
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  question: {
    width: 35,
    height: 35,
    marginTop: "15%", // Adjust to your needs
    alignSelf: "flex-end", // Pushes the image to the right
  },
  TAR: {
    width: 200,
    height: 250,
    marginTop: 103, // Adjust to your needs
  },
  login_btn: {
    width: 200,
    height: 74,
    borderRadius: 20,
    backgroundColor: "#2B303A",
    alignItems: "center", // Center the content horizontally
  },
  reg_txt: {
    color: "#2B303A",
    fontFamily: "Fredoka", // Ensure this font is loaded or available in your project
    fontSize: 15,
    fontWeight: "400", // Use numeric values for weight
    textDecorationLine: "underline", // Simplified text decoration
    marginTop: 15,
  },
  login_text: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
  },
  //   animatedContainer: {
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //   },
  //   image: {
  //     position: "absolute",
  //     width: 75,
  //     height: 75,
  //   },
  splash_bg: {
    width: "100%", // Full width of the screen
    position: "absolute",
    bottom: 20, // Position it above the bottom edge
  },
});
