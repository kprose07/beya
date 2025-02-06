import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from "react-native";
import * as Font from "expo-font"; // Import expo-font
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function Process({ route, navigation }) {
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const viewShotRef = useRef(null);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "ComingSoon": require("../../assets/fonts/comingSoon.ttf"), // Make sure the path is correct
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(photoUri);
        if (!fileInfo.exists) {
          console.error("File does not exist at path:", photoUri);
          return;
        }

        const formData = new FormData();
        formData.append("image", {
          uri: photoUri,
          type: "image/jpeg",
          name: `image_${Date.now()}.jpg`,
        });

        const response = await axios.post(
          "https://mathsolverv23-406702899784.us-central1.run.app/solve",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSteps(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [photoUri]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      ) : (
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.8 }} style={styles.imageContainer}>
          <Image source={{ uri: photoUri }} style={styles.image} />
          <ScrollView contentContainerStyle={styles.textContainer}>
            {steps && Object.entries(steps).map(([key, value], index) => (
              <Text key={index} style={styles.stepText}>
                {value}
              </Text>
            ))}
          </ScrollView>
        </ViewShot>
      )}
      {!loading && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => console.log("Saving...")} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: "Home" })} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  imageContainer: {
    alignItems: "center",
    position: "relative",
    width: width * 0.8,
    height: height * 0.7,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },
  textContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: width * 0.8,
    padding:10,
  },
  stepText: {
    fontSize: 24,
    fontFamily: "ComingSoon", // Apply the loaded handwriting font
    color: "red",
    textAlign: "left",
    flexWrap: "wrap",
    width: "60%",
  },  
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#2B303A",
    padding: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
