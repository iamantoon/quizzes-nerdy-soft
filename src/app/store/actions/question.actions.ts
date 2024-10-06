import { createAction, props } from '@ngrx/store';
import { Question } from '../../shared/models/questions';

export const loadQuestions = createAction('[Question] Load Questions');

export const loadQuestionsSuccess = createAction(
  '[Question] Load Questions Success', 
  props<{ questions: Question[] }>()
);

export const loadQuestionsFailure = createAction(
  '[Question] Load Questions Failure', 
  props<{ error: string }>()
);
