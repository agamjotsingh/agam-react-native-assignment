import React, { useState } from "react";

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { UserDatabase } from "../Data/UserDatabase";

const LoginScreen = (props) => {
  let [userName, setUserName] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [errortext, setErrortext] = useState("");

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userName) {
      alert("Please fill Username");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    let user = UserDatabase.find((it) => it.username === userName);
    if (user && user.password === userPassword) {
      AsyncStorage.setItem("username", userName);
      props.navigation.navigate("Home", {name : userName});
    } else {
      setErrortext("Please check your email id or password");
    }
  };

  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../Assets/Images/spiral.png")}
              style={{
                width: "50%",
                height: 100,
                resizeMode: "contain",
                margin: 30,
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
              placeholder="Enter Username"
              placeholderTextColor="lightgray"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._passwordinput && this._passwordinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              placeholder="Enter Password"
              placeholderTextColor="lightgray"
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "darkgreen",
    borderWidth: 0,
    color: "darkgreen",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
