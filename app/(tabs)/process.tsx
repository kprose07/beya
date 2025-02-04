import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
const { width, height } = Dimensions.get("window");

export default function Process({ route, navigation }) {
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // Simulate processing delay
    return () => clearTimeout(timer);
  }, []);
  // Make the canvas handler async so we can await drawing operations

  handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          {/* Base image */}
          <Image source={{ uri: photoUri }} style={styles.image} />

          {/* Canvas overlay */}
          <Canvas style={styles.canvas} ref={this.handleCanvas} />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Main", { screen: "History", params: { photoUri } })
              }
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main", { screen: "Home" })}
              style={styles.deleteButton}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#fff" 
  },
  loadingContainer: { 
    alignItems: "center" 
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 16, 
    color: "#555" 
  },
  imageContainer: { 
    alignItems: "center", 
    position: "relative" 
  },
  image: { 
    width: width * 0.8, 
    height: height * 0.7, 
    position: "absolute", 
    zIndex: 0 
  },
  canvas: { 
    width: width * 0.8, 
    height: height * 0.7, 
    position: "absolute", 
    zIndex: 1 
  },
  buttonContainer: { 
    flexDirection: "row", 
    gap: 20, 
    marginTop: height * 0.75 
  },
  saveButton: { 
    backgroundColor: "#2B303A", 
    padding: 15, 
    borderRadius: 5 
  },
  deleteButton: { 
    backgroundColor: "#e74c3c", 
    padding: 15, 
    borderRadius: 5 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16 
  },
});
