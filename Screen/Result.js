import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { Button } from "../Components/Button";

const Result = (props) => {
  const score = props.store.questions.filter(
    (item, index) => item.correct_answer === props.store.answeres[index]
  ).length;
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Congrats, You scored</Text>
      <Text style={styles.text}>
        {score}/{props.store.questions.length}
      </Text>
      <View style={{ flex:0.15 , justifyContent: 'center',  flexDirection: "row" }}>
        <Button onPress={() =>  props.navigation.navigate("Answers")} text="View Answers"></Button>
      </View>
    </View>
  );
};
export default inject("store")(observer(Result));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    justifyContent: 'center',
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 50,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "bold",
  },
  textHeading: {
    color: "#fff",
    fontSize: 29,
    height: 45,
    marginTop: 50,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "bold",
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between",
  },
});
