import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function Process({ route, navigation }) {
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(null);
  const viewShotRef = useRef(null);
  
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
          "https://mathsolverv2-406702899784.us-central1.run.app/solve",
          formData,
          {
            headers: { "Content-Type": "form-data" },
          }
        );
        setSteps(response);
        console.log(response.config.data._parts);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [photoUri]);

  const saveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + `image_${Date.now()}.jpg`;
      const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await FileSystem.writeAsStringAsync(fileUri, fileContent, { encoding: FileSystem.EncodingType.Base64 });

      const history = await AsyncStorage.getItem("history");
      let historyArray = history ? JSON.parse(history) : [];
      historyArray.push(fileUri);
      await AsyncStorage.setItem("history", JSON.stringify(historyArray));
      
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
          <Image source={{ uri: photoUri }} style={styles.image} />
          <Canvas
  style={styles.canvas}
  ref={(canvas) => {
    if (canvas) {
      //console.log("Steps Data:", steps);
      setTimeout(() => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
          ctx.font = "50px Arial";
          ctx.fillStyle = "red";
          ctx.fillText("HI", 100,100);

          let y = 0;
          Object.entries(steps).forEach(([key, value]) => {
            ctx.fillText(`${key}: ${value}`, 0, y);
            y += 3;
          });
        }
      }, 100); // Delay drawing slightly to ensure canvas is ready
    }
  }}
/>

        </ViewShot>
      )}
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
