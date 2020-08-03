import React from "react";
import { inject, observer } from "mobx-react";
import { FlatList, StyleSheet, Text, SafeAreaView, View } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#36B1F0',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 22,
    },
  });

const Item = ({ title, sub }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Q. {title}</Text>
    <Text style={styles.title}>Ans. {sub}</Text>
  </View>
);

const Answers = (props) => {
  const renderItem = ({ item }) => <Item title={item.question} sub={item.correct_answer} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.store.questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.question.length}
      />
    </SafeAreaView>
  );
};

export default inject("store")(observer(Answers));
