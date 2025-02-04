import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import ViewShot from "react-native-view-shot"; // Import ViewShot
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const { width, height } = Dimensions.get("window");

export default function Process({ route, navigation }) {
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);
  const viewShotRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const saveImage = async () => {
    try {
      // Capture the entire view (image + canvas overlay)
      const uri = await viewShotRef.current.capture();

      // Retrieve existing history
      const history = await AsyncStorage.getItem("history");
      let historyArray = history ? JSON.parse(history) : [];

      // Add new image
      historyArray.push(uri);

      // Save updated history back to storage
      await AsyncStorage.setItem("history", JSON.stringify(historyArray));

      // Navigate to history screen
      navigation.navigate("Main", { screen: "History" });
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      ) : (
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.8 }} style={styles.imageContainer}>
          {/* Base image */}
          <Image source={{ uri: photoUri }} style={styles.image} />

          {/* Canvas overlay */}
          <Canvas
            style={styles.canvas}
            ref={(canvas) => {
              if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "purple";
                ctx.fillRect(0, 0, 100, 100);
              }
            }}
          />
        </ViewShot>
      )}

      {/* Buttons */}
      {!loading && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={saveImage} style={styles.saveButton}>
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
  canvas: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
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
