import { TestBed } from "@angular/core/testing";
import { QuizService } from "./quiz.service";
import { Question } from "../../shared/models/questions";

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should return an empty array if there are no questions', () => {
    const result = service.organizeQuizzes([], 10, 5);
    expect(result.length).toBe(0);
  });

  it('should handle case where there are fewer questions than needed for all quizzes', () => {
    const mockQuestions: Question[] = Array.from({ length: 30 }, (_, index) => ({
      question: `Question ${index + 1}`,
      correct_answer: 'Correct answer',
      incorrect_answers: ['Incorrect 1', 'Incorrect 2', 'Incorrect 3'],
      type: 'multiple',
      difficulty: 'easy',
      category: 'General Knowledge',
    }));
    
    const result = service.organizeQuizzes(mockQuestions, 10, 5);
    expect(result.length).toBe(6);
  });
});
