import { Component, inject, OnInit } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { MatIcon } from '@angular/material/icon';
import { QuizService } from '../../core/services/quiz.service';
import { Answer } from '../../shared/models/answers';
import { Router } from '@angular/router';
import { QuestionWithAnswers } from '../../shared/models/questions';
import { MatButton } from '@angular/material/button';
import { AnswerService } from '../../core/services/answer.service';
import { Store } from '@ngrx/store';
import { QuizState } from '../../store/reducers/quiz.reducer';
import { Observable } from 'rxjs';
import { Quiz } from '../../shared/models/quizzes';
import { selectCurrentQuiz } from '../../store/selectors/quiz.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { setCurrentQuiz } from '../../store/actions/quiz.actions';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    QuestionComponent,
    MatButton,
    MatIcon,
    MatButton,
    NgIf,
    AsyncPipe
],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit {
  private store = inject(Store<QuizState>);
  public currentQuiz$: Observable<Quiz | null> = this.store.select(selectCurrentQuiz);
  public quizService = inject(QuizService);
  private answerService = inject(AnswerService);
  private router = inject(Router);
  public answers: Answer[] = [];
  public questions: string[] = [];
  public currentQuestionIndex = 0;
  public questionWithAnswers?: QuestionWithAnswers;
  public shuffledAnswers: string[] = [];
  private startTime = 0;

  ngOnInit(): void {
    this.startQuiz();
  }

  public startQuiz(): void {
    this.currentQuiz$.subscribe({
      next: quiz => {
        if (quiz) {
          this.loadQuestion(this.currentQuestionIndex);
          this.startTime = Date.now();
        } else {
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  public loadQuestion(index: number): void {
    this.currentQuiz$.subscribe(currentQuiz => {
      if (!currentQuiz) return;
      
      const question = currentQuiz.questions[index];
      if (!question) return;
      
      this.shuffledAnswers = this.shuffleAnswers([
        question.correct_answer,
        ...question.incorrect_answers
      ]);
  
      this.questionWithAnswers = {
        question: question.question,
        answers: this.shuffledAnswers
      };
    });
  }

  public answer(event: string) {
    const existingAnswerIndex = this.answers.findIndex(
      ans => ans.questionIndex === this.currentQuestionIndex
    );
    
    if (existingAnswerIndex !== -1) this.answers[existingAnswerIndex].answer = event;
    else this.answers.push({questionIndex: this.currentQuestionIndex, answer: event});
  }

  public isAnswerProvided(): boolean {
    return this.currentQuestionIndex >= 0 && 
           this.currentQuestionIndex < this.answers.length && 
           this.answers[this.currentQuestionIndex]?.answer != null;
  }

  public nextQuestion() {
    this.currentQuiz$.subscribe(currentQuiz => {
      if (!currentQuiz) return;
      if (!this.isAnswerProvided()) return;

      this.answerService.currentQuizResults.update(value => [
        ...value,
        {
          question: currentQuiz.questions[this.currentQuestionIndex],
          answer: this.answers[this.currentQuestionIndex]
        }
      ]);

      this.currentQuestionIndex++;

      if (this.currentQuestionIndex >= currentQuiz.questions.length) {
        this.finishQuiz();
      } else {
        this.loadQuestion(this.currentQuestionIndex);
      }
    });
  }

  public finishQuiz() {
    const endTime = Date.now();
    const durationInSeconds = Math.floor((endTime - this.startTime) / 1000);
    this.answerService.quizDuration.set(durationInSeconds);

    this.router.navigateByUrl('/finish');
  }

  public cancelQuiz() {
    this.store.dispatch(setCurrentQuiz({quiz: null}));
    this.answers = [];
    this.router.navigateByUrl('/');
  }

  private shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => Math.random() - 0.5);
  }
}
