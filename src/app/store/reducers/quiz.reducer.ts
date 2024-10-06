import { createReducer, on } from '@ngrx/store';
import { loadQuizzesSuccess, setCurrentQuiz } from '../actions/quiz.actions';
import { Quiz } from '../../shared/models/quizzes';

export const quizFeatureKey = 'quiz';

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null
}

export const quizReducer = createReducer(
  initialState,
  on(loadQuizzesSuccess, (state, { quizzes }) => ({ ...state, quizzes })),
  on(setCurrentQuiz, (state, { quiz }) => ({ ...state, currentQuiz: quiz }))
);
