import { createReducer, on } from '@ngrx/store';
import { loadQuestionsSuccess, loadQuestionsFailure } from '../actions/question.actions';
import { Question } from '../../shared/models/questions';

export const questionFeatureKey = 'question';

export interface QuestionState {
  questions: Question[];
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  error: null
}

export const questionReducer = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, { questions }) => ({ ...state, questions })),
  on(loadQuestionsFailure, (state, { error }) => ({ ...state, error })),
);
