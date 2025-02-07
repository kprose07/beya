import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
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

  const deletePDF = async (index) => {
    Alert.alert(
      "Delete PDF?",
      "Are you sure you want to remove this PDF?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              let updatedHistory = [...history];
              updatedHistory.splice(index, 1); // Remove the selected PDF

              await AsyncStorage.setItem("history", JSON.stringify(updatedHistory));
              setHistory(updatedHistory);
            } catch (error) {
              console.error("Error deleting PDF:", error);
            }
          },
        },
      ]
    );
  };

  const openPDF = async (uri) => {
    if (await FileSystem.getInfoAsync(uri)) {
      await Sharing.shareAsync(uri); // Share or open the PDF
    } else {
      Alert.alert("Error", "PDF not found.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Saved PDFs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.length > 0 ? (
          history.map((uri, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{uri.split("/").pop()}</Text> 
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.downloadButton} onPress={() => openPDF(uri)}>
                  <Image source={download} style={styles.btn_img} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deletePDF(index)}>
                  <Image source={trash} style={styles.btn_img} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No Saved PDFs Available</Text>
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
    rowGap: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "center",
    width: 200,
    height: 150,  // Adjusted height for text-based content
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
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",  // For readability of PDF filename
  },
  btn_img: {
    width: 40,
    height: 40,
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