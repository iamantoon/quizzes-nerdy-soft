export interface ApiResponse {
  response_code: number;
  results: Question[];
}

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionWithAnswers {
  question: string;
  answers: string[];
}