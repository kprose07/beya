import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import * as Font from "expo-font"; // Import expo-font
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
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
        ComingSoon: require("../../assets/fonts/comingSoon.ttf"),
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
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [photoUri]);

  const savePDF = async () => {
    try {
      if (!steps || !photoUri) return;
  
      console.log("Image URI for PDF:", photoUri);
  
      const fileInfo = await FileSystem.getInfoAsync(photoUri);
      if (!fileInfo.exists) {
        console.error("Image file not found:", photoUri);
        alert("Image not found.");
        return;
      }
  
      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const stepsHtml = Object.entries(steps)
        .map(
          ([, value]) =>
            `<p style="font-size: 18px; color: red; margin: 10px 0;">${value}</p>`
        )
        .join("");
  
      // Use base64 image in the HTML content
     // Whiteboard-styled PDF content
     const htmlContent = `
     <html>
       <head>
         <style>
           @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

           body {
             font-family: 'Architects Daughter', cursive;
             padding: 20px;
             margin: 0;
             display: flex;
             justify-content: center;
             align-items: center;
             height: 100vh;
             background-color: #f8f8f8; /* Soft whiteboard color */
           }

           .pdf_container {
             width: 100%;
             max-width: 800px;
             height: 90vh;
             background: rgb(197, 194, 194);
             border: 2px solid rgb(187, 183, 183);
             border-radius: 10px;
             padding: 20px;
             box-shadow: 5px 5px 15px rgb(197, 194, 194);
             display: flex;
             flex-direction: row;
             overflow: hidden;
           }

           .image_container {
             flex: 1;
             display: flex;
             justify-content: flex-start;
             width: 400px;
             height: 600px;
             padding-right: 15px;
           }

           .image {
             width: 100%;
             height: 100%;
             max-height: 500px;
             border: 2px solid black;
           }

           .text_container {
             flex: 1;
             display: flex;
             flex-direction: column;
             font-size: 18px;
             color: red;
             line-height: 1.5;
             overflow-y: auto; /* Enables vertical scrolling */
             max-height: 800px; /* Ensures it stays within the page */
             padding-right: 10px;
           }

           .title {
             color: black;
             font-size: 24px;
             font-weight: bold;
             text-align: center;
             margin-bottom: 10px;
           }
         </style>
       </head>
       <body>
         <div class="pdf_container">
           <div class="image_container">
             <img src="data:image/jpeg;base64,${base64Image}" class="image" />
           </div>
           <div class="text_container">
             <h2 class="title">📝 T.A.R's Feedback</h2>
             ${stepsHtml}
           </div>
         </div>
       </body>
     </html>
   `;
  
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
  
      const fileUri = FileSystem.documentDirectory + `processed_${Date.now()}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
  
      // Add the file URI to history
      const history = await AsyncStorage.getItem("history");
      let historyArray = history ? JSON.parse(history) : [];
      historyArray.push(fileUri);
      await AsyncStorage.setItem("history", JSON.stringify(historyArray));
  
      // Navigate to the history page after saving
 navigation.navigate("Main", { screen: "History" });  
      alert("PDF saved successfully!");
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };
  
  
  const deletePhoto = () => {
    Alert.alert("Delete Photo?", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

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
          <View style={styles.contBoard}>
          <ScrollView contentContainerStyle={styles.textContainer}>
            {steps &&
              Object.entries(steps).map(([key, value], index) => (
                <Text key={index} style={styles.stepText}>
                  {value}
                </Text>
              ))}
          </ScrollView>
          </View>
        </ViewShot>
      )}
      {!loading && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={savePDF} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save as PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePhoto} style={styles.deleteButton}>
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
    width: width * 0.9,
    height: height * 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 12,
  },
  image: {
    width: "60%",
    height: "50%",
    zIndex: 0,
  },
  contBoard:{
    borderColor: "rgb(187, 183, 183)",
    borderWidth: 2,
    borderRadius: 10,
    width:330,
    height:250,
    padding:10
  },
  textContainer: {
    padding: 10,
    zIndex: 1,
    width: "100%",
  },
  stepText: {
    fontSize: 18,
    fontFamily: "ComingSoon",
    color: "red",
    textAlign: "left",
    flexWrap: "wrap",
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
