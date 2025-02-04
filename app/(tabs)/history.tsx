import React, { useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import trash from '../../assets/images/trash.png';
import download from '../../assets/images/download.png';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const deleteImage = async (index) => {
    Alert.alert(
      "Delete Image?",
      "Are you sure you want to remove this image?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              let updatedHistory = [...history];
              updatedHistory.splice(index, 1); // Remove the selected image

              await AsyncStorage.setItem("history", JSON.stringify(updatedHistory));
              setHistory(updatedHistory);
            } catch (error) {
              console.error("Error deleting image:", error);
            }
          } 
        }
      ]
    );
  };

  const downloadImage = async (uri) => {
    try {
      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "You need to grant storage permissions to download images.");
        return;
      }

      // Create a filename and download the image
      const fileUri = FileSystem.documentDirectory + `image_${Date.now()}.jpg`;
      const { uri: newUri } = await FileSystem.downloadAsync(uri, fileUri);

      // Save the file to the gallery
      await MediaLibrary.createAssetAsync(newUri);
      Alert.alert("Download Complete", "Image saved to gallery.");
    } catch (error) {
      console.error("Download Error:", error);
      Alert.alert("Download Failed", "An error occurred while downloading the image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Images</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.length > 0 ? (
          history.map((uri, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri }} style={styles.image} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.downloadButton} onPress={() => downloadImage(uri)}>
                <Image source={download} style={styles.btn_img}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(index)}>
                <Image source={trash} style={styles.btn_img}/>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No Saved Images Available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: "14%",
    rowGap:25,
  
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    display:"flex",
    width:"100%",
    alignItems: "center",
    marginTop:20,
  },
  card: {
    display:"flex",
    flexDirection:"row",
    columnGap:20,
    justifyContent:"center",
    width: 200,
    height:310,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  btn_img:{
    width:40,
    height:40,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  downloadButton: {
    backgroundColor: "#2B303A",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  noHistoryText: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});

