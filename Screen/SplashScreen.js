import React, { useEffect, useRef } from "react";

//Import all required component
import { Animated, Easing, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = (props) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    setTimeout(() => {
      //   Check if user_id is set or not
      //   If not then send for Login
      //   else send to Home Screen
      AsyncStorage.getItem("username").then((value) =>
        props.navigation.navigate(value === null ? "LoginScreen" : "Home", {
          name: value,
        })
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: "40%",
          flex: 1,
          resizeMode: "contain",
          margin: 30,
          transform: [{ rotate: spin }],
        }}
        source={require("../Assets/Images/spiral.png")}
      />
      <Text style={styles.heading}>Quiz Up</Text>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  heading: {
    flex: 1,
    color: "#323232",
    fontSize: 40,
    alignItems: "center",
    fontWeight: "bold",
  },
});
