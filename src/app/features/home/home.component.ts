import { Component, inject, OnInit } from '@angular/core';
import { QuizzesComponent } from "../quizzes/quizzes.component";
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AnswerService } from '../../core/services/answer.service';
import { TooltipComponent } from "../../shared/components/tooltip/tooltip.component";
import { Store } from '@ngrx/store';
import { QuizState } from '../../store/reducers/quiz.reducer';
import { selectQuizzes } from '../../store/selectors/quiz.selectors';
import { loadQuizzes, setCurrentQuiz } from '../../store/actions/quiz.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuizzesComponent, MatButton, TooltipComponent, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private store = inject(Store<QuizState>);
  private router = inject(Router);
  private answerService = inject(AnswerService);
  public quizzes$ = this.store.select(selectQuizzes);

  ngOnInit(): void {
    this.resetPreviousAnswers();
  }

  public playRandomQuiz(): void {
    this.quizzes$.pipe(take(1)).subscribe((quizzes) => {
      if (quizzes && quizzes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        const selectedQuiz = quizzes[randomIndex];
        this.store.dispatch(setCurrentQuiz({quiz: selectedQuiz}));
        this.router.navigateByUrl('/play');
      } else {
        this.store.dispatch(loadQuizzes());
      }
    });
  }

  public resetPreviousAnswers() {
    this.answerService.currentQuizResults.set([]);
    this.store.dispatch(setCurrentQuiz({quiz: null}));
  }
}
