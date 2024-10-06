import { Component, input, output } from '@angular/core';
import { QuestionWithAnswers } from '../../../shared/models/questions';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [NgClass],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  public question = input.required<QuestionWithAnswers>();
  public setAnswer = output<string>();
  private selectedAnswer: string | null = null;

  public answer(choice: string) {
    this.selectedAnswer = choice;
    this.setAnswer.emit(choice);
  }

  public isSelected(choice: string): boolean {
    return this.selectedAnswer === choice;
  }

  public sanitizeQuestion(question: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = question;
    return textArea.value || question;
  }
}
