import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from '../../core/services/quiz.service';
import { QuizItemComponent } from "./quiz-item/quiz-item.component";
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { QuizState } from '../../store/reducers/quiz.reducer';
import { Quiz } from '../../shared/models/quizzes';
import { selectQuizzes } from '../../store/selectors/quiz.selectors';
import { loadQuizzes } from '../../store/actions/quiz.actions';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [QuizItemComponent, NgIf, AsyncPipe],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements OnInit {
  private store = inject(Store<QuizState>);
  public quizzes$: Observable<Quiz[]> = this.store.select(selectQuizzes);
  public quizService = inject(QuizService);
  
  ngOnInit(): void {
    this.quizzes$.pipe(take(1)).subscribe(quizzes => {
      if (!quizzes.length) {
        this.store.dispatch(loadQuizzes());
      }
    });
  }
}
