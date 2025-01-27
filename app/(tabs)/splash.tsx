import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Easing,
} from "react-native";
import SplashStyles from "../../assets/styles/splash";

export default function Splash({ navigation }) {
  const screenWidth = Dimensions.get("window").width;

  // Animation values for sliding and fading
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start off-screen to the right
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 10, // Stop at marginLeft = 10px
        duration: 4000, // 4 seconds
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in to full opacity
        duration: 4000, // 4 seconds
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={SplashStyles.container}>
      <View style={SplashStyles.splash_cont}>
        <Image
          style={SplashStyles.question}
          source={require("../../assets/images/question.png")}
        />
        <Image
          style={SplashStyles.TAR}
          source={require("../../assets/images/TAR.png")}
        />
        <TouchableOpacity
          style={SplashStyles.login_btn}
          onPress={() => navigation.replace("Home")} // Navigate to Main (Drawer)
        >
          <Text style={SplashStyles.login_text}>Login</Text>
        </TouchableOpacity>
        <Text style={SplashStyles.reg_txt}>Register</Text>
      </View>

      {/* Sliding and Fading Background Image */}
      <Animated.Image
        style={[
          SplashStyles.splash_bg,
          {
            opacity: fadeAnim, // Apply fade-in
            transform: [{ translateX: slideAnim }], // Apply sliding
          },
        ]}
        source={require("../../assets/images/splashbg.png")}
      />
    </View>
  );
}
