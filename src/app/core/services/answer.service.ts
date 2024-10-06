import { computed, Injectable, signal } from '@angular/core';
import { QuizResults } from '../../shared/models/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  public currentQuizResults = signal<QuizResults[]>([]);
  public quizDuration = signal<number>(0);
  
  public correctAnswersCount = computed(() => 
    this.currentQuizResults().filter(result => 
      result.answer.answer === result.question.correct_answer
    ).length
  );
  public detailedResults = computed(() => 
    this.currentQuizResults().map(result => ({
      question: result.question.question,
      answers: [...result.question.incorrect_answers, result.question.correct_answer],
      yourAnswer: result.answer.answer,
      correctAnswer: result.question.correct_answer,
      isCorrect: result.answer.answer === result.question.correct_answer
    }))
  );
}
