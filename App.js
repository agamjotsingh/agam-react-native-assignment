/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


//Import all the screens needed
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";
import WelcomeScreen from "./Screen/WelcomeScreen";

import { Provider } from "mobx-react";
import store from "./Store/Store";
import Quiz from "./Screen/Quiz";
import Result from "./Screen/Result";
import Answers from "./Screen/Answers";


const Congrats = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  Result: {
    screen: Result,
    navigationOptions: {
      headerShown: false,
    },
  },
  Answers: {
    screen: Answers,
    navigationOptions: {
      headerShown: false,
    },
  },
});

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
  const Nav = createSwitchNavigator({
    SplashScreen: {
      /* SplashScreen which will come once for 5 Seconds */
      screen: SplashScreen,
      navigationOptions: {
        /* Hiding header for Splash Screen */
        headerShown: false,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerShown: false,
      },
    },
    Congrats: {
      screen: Congrats
    },
  });

const Comp = createAppContainer(Nav)

const App = () => {
  return (
    <Provider store={store}>
      <Comp/>
    </Provider>
  );
};

export default App;
