import { Component, inject } from '@angular/core';
import { AnswerService } from '../../../core/services/answer.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  public answerService = inject(AnswerService);

  public sanitizeQuestion(question: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = question;
    return textArea.value || question;
  }
}
