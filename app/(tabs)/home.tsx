import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import HomeStyle from "../../assets/styles/home";

export default function Home({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null); 
  const cameraRef = useRef(null); 
  const [showHowTo, setShowHowTo] = useState<boolean>(false); // Explicitly typing showHowTo as boolean
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri); 
    }
  }

  return (
    <View style={HomeStyle.h_container}>
      <View style={HomeStyle.h_colTwo}>
        <CameraView style={styles.camera} ref={cameraRef} />
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
        <Image style={HomeStyle.flashlight} source={require("../../assets/images/Flash.png")} />
        <TouchableOpacity style={HomeStyle.scanButton} onPress={takePicture}>
          <Image style={HomeStyle.scan} source={require("../../assets/images/scan.png")} />
        </TouchableOpacity>
        <Image style={HomeStyle.history} source={require("../../assets/images/history.png")} />
      </View>
      {photo && <Image source={{ uri: photo }} style={{ position: "absolute",width: "80%", height: "80%", display: 'flex',justifyContent:"center",alignSelf:"center", marginTop:"20%"}} />}
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
