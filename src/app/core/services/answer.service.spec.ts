import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(() => {
    service = new AnswerService();
  });

  it('should create an instance of AnswerService', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize currentQuizResults with an empty array', () => {
    expect(service.currentQuizResults()).toEqual([]);
  });

  it('should correctly compute the correctAnswersCount', () => {
    const mockResults = [
      {
        question: {
          question: 'What is the capital of France?',
          correct_answer: 'Paris',
          incorrect_answers: ['London', 'Berlin', 'Madrid'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'Geography',
        },
        answer: {
          answer: 'Paris',
          questionIndex: 0,
        },
      },
      {
        question: {
          question: 'What is the largest ocean?',
          correct_answer: 'Pacific Ocean',
          incorrect_answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'Geography',
        },
        answer: {
          answer: 'Atlantic Ocean',
          questionIndex: 1,
        },
      },
    ];

    service.currentQuizResults.set(mockResults);
    const correctCount = service.correctAnswersCount();

    expect(correctCount).toBe(1);
  });

  it('should compute detailedResults correctly', () => {
    const mockResults = [
      {
        question: {
          question: 'What is the capital of France?',
          correct_answer: 'Paris',
          incorrect_answers: ['London', 'Berlin', 'Madrid'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'Geography',
        },
        answer: {
          answer: 'Paris',
          questionIndex: 0,
        },
      },
      {
        question: {
          question: 'What is the largest ocean?',
          correct_answer: 'Pacific Ocean',
          incorrect_answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'Geography',
        },
        answer: {
          answer: 'Atlantic Ocean',
          questionIndex: 1,
        },
      },
    ];

    service.currentQuizResults.set(mockResults);
    const detailedResults = service.detailedResults();

    expect(detailedResults.length).toBe(2);
    expect(detailedResults[0].question).toBe('What is the capital of France?');
    expect(detailedResults[0].yourAnswer).toBe('Paris');
    expect(detailedResults[0].correctAnswer).toBe('Paris');
    expect(detailedResults[0].isCorrect).toBe(true);
    expect(detailedResults[1].question).toBe('What is the largest ocean?');
    expect(detailedResults[1].yourAnswer).toBe('Atlantic Ocean');
    expect(detailedResults[1].correctAnswer).toBe('Pacific Ocean');
    expect(detailedResults[1].isCorrect).toBe(false);
  });

  it('should set quizDuration correctly', () => {
    expect(service.quizDuration()).toBe(0);

    service.quizDuration.set(120);
    expect(service.quizDuration()).toBe(120);
  });
});
