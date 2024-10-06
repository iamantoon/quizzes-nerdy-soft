import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { AnswerService } from "../../core/services/answer.service";
import { Quiz } from "../../shared/models/quizzes";
import { setCurrentQuiz } from "../../store/actions/quiz.actions";
import { HomeComponent } from "./home.component";
import { QuizService } from "../../core/services/quiz.service";

function isQuiz(quiz: any): quiz is Quiz {
  return quiz && typeof quiz.name === 'string' && Array.isArray(quiz.questions);
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockAnswerService: any;
  let mockQuizService: any;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  
    mockAnswerService = jasmine.createSpyObj('AnswerService', ['quizDuration']);
    mockAnswerService.currentQuizResults = {
      set: jasmine.createSpy('set'),
      update: jasmine.createSpy('update'),
    };
  
    mockStore.select.and.returnValue(of([]));
    
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: QuizService, useValue: mockQuizService },
        { provide: AnswerService, useValue: mockAnswerService }
      ]
    });
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  
    fixture.detectChanges();
  });
  
  it('should play random quiz and navigate', () => {
    const quizzes: Quiz[] = [
      {
        name: 'Quiz 1',
        questions: [
          {
            type: 'multiple',
            difficulty: 'easy',
            category: 'General Knowledge',
            question: 'What is 2+2?',
            correct_answer: '4',
            incorrect_answers: ['3', '5', '6']
          }
        ]
      },
      {
        name: 'Quiz 2',
        questions: [
          {
            type: 'multiple',
            difficulty: 'medium',
            category: 'Science',
            question: 'What is H2O?',
            correct_answer: 'Water',
            incorrect_answers: ['Oxygen', 'Hydrogen', 'Carbon Dioxide']
          }
        ]
      }
    ];
  
    component.quizzes$ = of(quizzes);
  
    component.playRandomQuiz();
  
    const dispatchedAction = mockStore.dispatch.calls.mostRecent().args[0];
    expect(dispatchedAction.type).toEqual('[Quiz] Set Current Quiz');
    expect(dispatchedAction.quiz).toBeDefined();
    expect(isQuiz(dispatchedAction.quiz)).toBe(true);
  
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/play');
  });

  it('should reset previous answers', () => {
    mockAnswerService.currentQuizResults.set = jasmine.createSpy('set');
    
    component.resetPreviousAnswers();

    expect(mockAnswerService.currentQuizResults.set).toHaveBeenCalledWith([]);
    expect(mockStore.dispatch).toHaveBeenCalledWith(setCurrentQuiz({ quiz: null }));
  });

  it('should reset answers on ngOnInit', () => {
    spyOn(component, 'resetPreviousAnswers');

    component.ngOnInit();

    expect(component.resetPreviousAnswers).toHaveBeenCalled();
  });
});