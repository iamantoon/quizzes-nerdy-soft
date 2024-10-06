import { Question } from "./questions";

export interface Answer {
  questionIndex: number;
  answer: string;
}

export interface QuizResults {
  question: Question;
  answer: Answer;
}