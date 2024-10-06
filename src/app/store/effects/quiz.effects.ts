import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs';
import { QuizService } from '../../core/services/quiz.service';
import { QuestionService } from '../../core/services/question.service';
import { loadQuizzes, loadQuizzesSuccess } from '../actions/quiz.actions';
import { of } from 'rxjs';

@Injectable()
export class QuizEffects {
  loadQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuizzes),
      switchMap(() =>
        this.questionService.getQuestions().pipe(
          map(response => this.quizService.organizeQuizzes(response.results)),
          map(quizzes => loadQuizzesSuccess({ quizzes })),
          catchError(error => of({ type: '[Quiz] Load Quizzes Failure', error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions, 
    private quizService: QuizService, 
    private questionService: QuestionService
  ) {}
}
