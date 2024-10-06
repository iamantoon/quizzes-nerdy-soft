import { Injectable, signal } from '@angular/core';
import { Question } from '../../shared/models/questions';
import { Quiz } from '../../shared/models/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public organizeQuizzes(questions: Question[], quizCount = 10, questionsPerQuiz = 5): Quiz[] {
    const quizzes: Quiz[] = [];
    
    if (questions.length === 0) {
      return quizzes;
    }

    const maxQuizCount = Math.floor(questions.length / questionsPerQuiz);

    for (let i = 0; i < Math.min(quizCount, maxQuizCount); i++) {
      const quizQuestions = questions.slice(i * questionsPerQuiz, (i + 1) * questionsPerQuiz);
      quizzes.push({
        name: `Quiz ${i + 1}`,
        questions: quizQuestions,
      });
    }
    
    return quizzes;
  }
}
