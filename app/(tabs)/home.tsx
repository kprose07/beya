import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeStyle from "../../assets/styles/home";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null); 
  const cameraRef = useRef(null);
  const navigation = useNavigation(); // Hook for navigation
  const [showHowTo, setShowHowTo] = useState<boolean>(false); 

  // If permission is null (still loading), show nothing
  if (!permission) return <View />;

  // If permission isn't granted, ask for it
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Capture the picture and navigate to Process screen
  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
      navigation.navigate("Process", { photoUri: photoData.uri });
    }
  }

  return (
    <View style={HomeStyle.h_container}>
      {/* Camera Section */}
      <View style={HomeStyle.h_colTwo}>
        <CameraView style={styles.camera} ref={cameraRef} />
      </View>

      {/* Top Bar (Menu + Help Button) */}
      <View style={HomeStyle.h_colOne}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image style={HomeStyle.menu_img} source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={HomeStyle.q_img} onPress={() => setShowHowTo(!showHowTo)}>
          <Image source={require("../../assets/images/qblue.png")} />
        </TouchableOpacity>
      </View>

      {/* Camera Controls (Flashlight + Scan + History) */}
      <View style={HomeStyle.h_colThree}>
        <Image style={HomeStyle.flashlight} source={require("../../assets/images/Flash.png")} />
        <TouchableOpacity style={HomeStyle.scanButton} onPress={takePicture}>
          <Image style={HomeStyle.scan} source={require("../../assets/images/scan.png")} />
        </TouchableOpacity>
        <Image style={HomeStyle.history} source={require("../../assets/images/history.png")} />
      </View>

      {/* Display How To Use Modal */}
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
  container: { display: "flex", justifyContent: 'center', width: "100%", height: "100%" },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { display: "flex", justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%' },
  scanButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255, 255, 255, 0.5)", justifyContent: "center", alignItems: "center", marginBottom: 30, alignSelf: 'center' }
});