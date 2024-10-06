import { createSelector, createFeatureSelector } from '@ngrx/store';
import { questionFeatureKey, QuestionState } from '../reducers/question.reducer';

export const selectQuestionState = createFeatureSelector<QuestionState>(questionFeatureKey);

export const selectQuestions = createSelector(selectQuestionState, state => state.questions);
