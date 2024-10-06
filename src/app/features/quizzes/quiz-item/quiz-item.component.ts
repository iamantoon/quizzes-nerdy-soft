import { Component, inject, input } from '@angular/core';
import { Quiz } from '../../../shared/models/quizzes';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { QuizState } from '../../../store/reducers/quiz.reducer';
import { Store } from '@ngrx/store';
import { setCurrentQuiz } from '../../../store/actions/quiz.actions';

@Component({
  selector: 'app-quiz-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon
  ],
  templateUrl: './quiz-item.component.html',
  styleUrl: './quiz-item.component.scss'
})
export class QuizItemComponent {
  public quiz = input.required<Quiz>();
  private router = inject(Router);
  private store = inject(Store<QuizState>);

  public play(): void {
    this.store.dispatch(setCurrentQuiz({quiz: this.quiz()}));
    this.router.navigateByUrl('/play');
  }
}
