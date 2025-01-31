import { Camera, CameraType } from 'expo-camera'; // Removed FlashMode import for now
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import HomeStyle from "../../assets/styles/home";

export default function Home() {
  const [permission, setPermission] = useState(false);
  const [flashMode, setFlashMode] = useState('off'); // Use string values instead of FlashMode
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [showHowTo, setShowHowTo] = useState<boolean>(false);

  useEffect(() => {
    // Request camera permissions on component mount
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={() => Camera.requestCameraPermissionsAsync()} title="Grant Permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      navigation.navigate("Process", { photoUri: photoData.uri });
    }
  }

  function toggleFlash() {
    setFlashMode(prevMode => (prevMode === 'off' ? 'torch' : 'off')); // Toggle between 'off' and 'torch'
  }

  return (
    <View style={HomeStyle.h_container}>
      <View style={HomeStyle.h_colTwo}>
        <Camera
          style={styles.camera}
          ref={cameraRef}
          flashMode={flashMode} // Use string values for flashMode
          type={CameraType.back}
        />
      </View>

      <View style={HomeStyle.h_colOne}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image style={HomeStyle.menu_img} source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={HomeStyle.q_img} onPress={() => setShowHowTo(!showHowTo)}>
          <Image source={require("../../assets/images/qblue.png")} />
        </TouchableOpacity>
      </View>

      <View style={HomeStyle.h_colThree}>
        <TouchableOpacity onPress={toggleFlash}>
          <Image
            style={HomeStyle.flashlight}
            source={
              flashMode === 'off'
                ? require("../../assets/images/Flash.png")
                : require("../../assets/images/Flash.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={HomeStyle.scanButton} onPress={takePicture}>
          <Image style={HomeStyle.scan} source={require("../../assets/images/scan.png")} />
        </TouchableOpacity>
        <Image style={HomeStyle.history} source={require("../../assets/images/history.png")} />
      </View>

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
  container: { display: "flex", justifyContent: 'center',width:"100%",height:"100%" },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { display: "flex", justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%' },
  scanButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255, 255, 255, 0.5)", justifyContent: "center", alignItems: "center", marginBottom: 30, alignSelf: 'center' }
});
