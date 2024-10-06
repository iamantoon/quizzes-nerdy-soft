import { createAction, props } from '@ngrx/store';
import { Quiz } from '../../shared/models/quizzes';

export const loadQuizzes = createAction('[Quiz] Load Quizzes');

export const loadQuizzesSuccess = createAction(
  '[Quiz] Load Quizzes Success', 
  props<{ quizzes: Quiz[] }>()
);

export const setCurrentQuiz = createAction(
  '[Quiz] Set Current Quiz', 
  props<{ quiz: Quiz | null }>()
);
