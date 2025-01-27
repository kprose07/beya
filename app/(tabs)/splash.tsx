import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View, Dimensions, Easing } from "react-native";
import SplashStyles from "../../assets/styles/splash";

export default function Splash({ navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 4000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 4000,
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
          onPress={() => navigation.replace("Main")} // Navigate to Main (Drawer)
        >
          <Text style={SplashStyles.login_text}>Login</Text>
        </TouchableOpacity>
        <Text style={SplashStyles.reg_txt}>Register</Text>
      </View>
      <Animated.Image
        style={[
          SplashStyles.splash_bg,
          { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
        ]}
        source={require("../../assets/images/splashbg.png")}
      />
    </View>
  );
}
