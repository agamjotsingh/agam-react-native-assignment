import { Alert, View, StyleSheet, Text } from "react-native";
import React from "react";
import { Button } from "../Components/Button";

// imports inject and observer from 'mobx-react':
import { inject, observer } from "mobx-react";
import AsyncStorage from "@react-native-community/async-storage";

const WelcomeScreen = (props) => {
  const onStart = () => {
    fetch("​https://opentdb.com/api.php?amount=10&difficulty=hard")
      .then((response) => response.json())
      .then((data) => {
        props.store.setQuestions(data.results);
        props.navigation.navigate("Quiz");
      })
      .catch((err) => {
        props.navigation.navigate("Quiz");
      });
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes", onPress: () => clearUserIdAndNavigate() },
      ],
      { cancelable: true }
    );
  };

  const clearUserIdAndNavigate = () => {
    AsyncStorage.removeItem("username", () => props.navigation.navigate("LoginScreen"))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome, {props.navigation.getParam("name", "none")} {props.store.text}
      </Text>
      <View
        style={{ flex: 0.15, justifyContent: "center", flexDirection: "row" }}
      >
        <Button onPress={() => onStart()} text="Start Quiz"></Button>
      </View>

      <View
        style={{ flex: 0.15, justifyContent: "center", flexDirection: "row" }}
      >
        <Button onPress={() => logout()} text="Logout"></Button>
      </View>
    </View>
  );
};
export default inject("store")(observer(WelcomeScreen));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 40,
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600",
  },
});
