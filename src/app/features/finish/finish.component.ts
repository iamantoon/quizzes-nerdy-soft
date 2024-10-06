import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from '../../core/services/answer.service';
import { MatButton } from '@angular/material/button';
import { DetailsComponent } from "./details/details.component";

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [
    MatButton,
    DetailsComponent,
    MatButton
],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {
  private router = inject(Router);
  public answerService = inject(AnswerService);
  public correctAnswers = this.correctAnswersCount;
  public totalQuestions = this.answerService.currentQuizResults().length;

  get correctAnswersCount() {
    return this.answerService.correctAnswersCount();
  }

  public playAgain() {
    this.router.navigateByUrl('/');
  }

  public calculateCorrectPercentage(): number {
    return this.totalQuestions ? Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;
  }

  public formatTime(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  }
}
