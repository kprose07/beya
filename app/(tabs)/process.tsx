import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

export default function Process({ route, navigation }) {
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000); // Simulate processing for 5 seconds
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("History", { photoUri })} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  loadingContainer: { alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  imageContainer: { alignItems: "center" },
  image: { width: 300, height: 400, marginBottom: 20, borderRadius: 10 },
  buttonContainer: { flexDirection: "row", gap: 20 },
  saveButton: { backgroundColor: "#27ae60", padding: 10, borderRadius: 5 },
  deleteButton: { backgroundColor: "#e74c3c", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16 },
});
