import { Question } from "./questions";

export interface Quiz {
  name: string;
  questions: Question[];
}