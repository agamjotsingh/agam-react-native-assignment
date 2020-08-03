import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { inject, observer } from "mobx-react";

import { Button, ButtonContainer } from "../Components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600",
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between",
  },
});

class Quiz extends React.Component {
  state = {
    activeQuestionIndex: 0,
  };

  answer = (answer) => {
    let activeQuestionIndex = this.state.activeQuestionIndex + 1
    if (activeQuestionIndex >= this.props.store.questions.length) {
        this.props.navigation.navigate("Congrats");
        return
    }

    this.props.store.pushAnswer(answer);
    this.setState((prevState) => ({
      activeQuestionIndex: activeQuestionIndex,
    }));
  };

  render() {
    const questions = [...this.props.store.questions];

    const question = questions[this.state.activeQuestionIndex];
    const options = [...question.incorrect_answers];
    options.push(question.correct_answer);
    options.sort(() => Math.random() - 0.5);

    return (
      <View style={[styles.container, { backgroundColor: "#176932" }]}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {options.map((answer) => (
                <Button text={answer} onPress={() => this.answer(answer)} />
              ))}
            </ButtonContainer>
          </View>

          <Text style={styles.text}>
            {`${this.state.activeQuestionIndex}/${questions.length}`}
          </Text>
        </SafeAreaView>
        {/* <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        /> */}
      </View>
    );
  }
}

export default inject("store")(observer(Quiz));
