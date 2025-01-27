import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import HomeStyle from "../../assets/styles/home";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null); // To store the photo URI
  const cameraRef = useRef<Camera>(null); // Ref to Camera
  const [showHowTo, setShowHowTo] = useState<boolean>(false); // Explicitly typing showHowTo as boolean

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Function to capture the photo
  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri); // Store the photo URI
    }
  }

  return (
    <View style={HomeStyle.h_container}>
      {/* Camera View in Column 2 */}
      <View style={HomeStyle.h_colTwo}>
        <CameraView
          style={styles.camera}
          facing="back" // Default to back camera
          ref={cameraRef} // Attach the ref to the camera
        />
      </View>

      {/* Column One with Images */}
      <View style={HomeStyle.h_colOne}>
        <Image
          style={HomeStyle.menu_img}
          source={require("../../assets/images/menu.png")}
        />
        <TouchableOpacity
          style={HomeStyle.q_img}
          onPress={() => setShowHowTo(!showHowTo)}
        >
          <Image source={require("../../assets/images/qblue.png")} />
        </TouchableOpacity>
      </View>

      {/* Column Three with Additional Icons */}
      <View style={HomeStyle.h_colThree}>
        <Image
          style={HomeStyle.flashlight}
          source={require("../../assets/images/Flash.png")}
        />
        
        {/* Scan Image Button to Take Picture */}
        <TouchableOpacity style={HomeStyle.scanButton} onPress={takePicture}>
          <Image
            style={HomeStyle.scan}
            source={require("../../assets/images/scan.png")} // Scan image as the button
          />
        </TouchableOpacity>

        <Image
          style={HomeStyle.history}
          source={require("../../assets/images/history.png")}
        />
      </View>

      {/* Display the captured photo */}
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 20 }}
        />
      )}

      {/* How To Use Section */}
      {showHowTo && (
        <View style={HomeStyle.how_to}>
          <Text style={HomeStyle.how_title}>How To Use</Text>
          <View>
            <Text style={HomeStyle.how_qTAR}>?TAR</Text>
            <Text style={HomeStyle.how_subt}>
              TAR will show you how to solve a question or problem
            </Text>
          </View>
          <View>
            <Text style={HomeStyle.how_iTAR}>ITAR</Text>
            <Text style={HomeStyle.how_subt}>
              TAR will summarize and annotate your notes or text.
            </Text>
          </View>
          <View>
            <Text style={HomeStyle.how_cTAR}>CTAR</Text>
            <Text style={HomeStyle.how_subt}>
              TAR will check your work and annotate any corrections.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    alignSelf: 'center', // Center the button
  },
});
