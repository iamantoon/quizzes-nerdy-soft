import { TestBed } from '@angular/core/testing';
import { FinishComponent } from './finish.component';
import { Router } from '@angular/router';
import { AnswerService } from '../../core/services/answer.service';

describe('FinishComponent', () => {
  let component: FinishComponent;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAnswerService: jasmine.SpyObj<AnswerService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockAnswerService = jasmine.createSpyObj('AnswerService', ['correctAnswersCount', 'currentQuizResults']);
    
    mockAnswerService.correctAnswersCount.and.returnValue(5);
    mockAnswerService.currentQuizResults.and.returnValue([
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
          question: "What is the chemical symbol for gold?",
          correct_answer: "Au",
          incorrect_answers: ["Ag", "Pb", "Fe"],
          type: "multiple",
          difficulty: "medium",
          category: "Chemistry"
        },
        answer: {
          answer: "Au",
          questionIndex: 1
        }
      }, 
      {
        question: {
          question: "Who wrote 'Romeo and Juliet'?",
          correct_answer: "William Shakespeare",
          incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"],
          type: "multiple",
          difficulty: "easy",
          category: "Literature"
        },
        answer: {
          answer: "William Shakespeare",
          questionIndex: 2
        }
      }, 
      {
        question: {
          question: "What is the smallest country in the world?",
          correct_answer: "Vatican City",
          incorrect_answers: ["Monaco", "Nauru", "San Marino"],
          type: "multiple",
          difficulty: "easy",
          category: "Geography"
        },
        answer: {
          answer: "Vatican City",
          questionIndex: 3
        }
      }, 
      {
        question: {
          question: "Which element has the atomic number 1?",
          correct_answer: "Hydrogen",
          incorrect_answers: ["Helium", "Oxygen", "Carbon"],
          type: "multiple",
          difficulty: "easy",
          category: "Chemistry"
        },
        answer: {
          answer: "Hydrogen",
          questionIndex: 4
        }
      }, 
      {
        question: {
          question: "What is the longest river in the world?",
          correct_answer: "Nile",
          incorrect_answers: ["Amazon", "Yangtze", "Mississippi"],
          type: "multiple",
          difficulty: "medium",
          category: "Geography"
        },
        answer: {
          answer: "Nile",
          questionIndex: 5
        }
      }
    ]);
  
    TestBed.configureTestingModule({
      providers: [
        FinishComponent,
        { provide: Router, useValue: mockRouter },
        { provide: AnswerService, useValue: mockAnswerService },
      ],
    });

    component = TestBed.inject(FinishComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalQuestions and correctAnswers properly', () => {
    expect(component.totalQuestions).toBe(6);
    expect(component.correctAnswers).toBe(5);
  });

  it('should calculate correct percentage', () => {
    const percentage = component.calculateCorrectPercentage();
    expect(percentage).toBe(83);
  });

  it('should navigate to the home page on playAgain', () => {
    component.playAgain();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should format time correctly', () => {
    expect(component.formatTime(75)).toBe('1 min 15 sec');
    expect(component.formatTime(45)).toBe('45 sec');
    expect(component.formatTime(360)).toBe('6 min 0 sec');
  });
});