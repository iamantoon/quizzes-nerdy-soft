import { createSelector, createFeatureSelector } from '@ngrx/store';
import { quizFeatureKey, QuizState } from '../reducers/quiz.reducer';

export const selectQuizState = createFeatureSelector<QuizState>(quizFeatureKey);

export const selectQuizzes = createSelector(selectQuizState, (state: QuizState) => state.quizzes);
export const selectCurrentQuiz = createSelector(selectQuizState, (state: QuizState) => state.currentQuiz);
