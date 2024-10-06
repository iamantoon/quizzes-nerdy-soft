import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadQuestions, loadQuestionsSuccess, loadQuestionsFailure } from '../actions/question.actions';
import { QuestionService } from '../../core/services/question.service';

@Injectable()
export class QuestionEffects {
  loadQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions),
      switchMap(() =>
        this.questionService.getQuestions().pipe(
          map(questions => loadQuestionsSuccess({questions: questions.results})),
          catchError(error => of(loadQuestionsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private questionService: QuestionService) {}
}
