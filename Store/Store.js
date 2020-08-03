import { decorate, observable, action } from "mobx";
import { Questions } from "../Data/Questions";

class Store {
  questions = Questions;
  answeres = [];

  pushAnswer = (answer) => {
    this.answeres.push(answer);
  };

  setQuestions = (questions) => {
    this.questions = questions;
  };
}

// another way to decorate variables with observable
decorate(Store, {
  answeres: observable,
  pushAnswer: action,
  questions: observable,
  setQuestions: action,
});

// export class
export default new Store();
