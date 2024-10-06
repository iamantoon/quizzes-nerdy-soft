import { TestBed } from '@angular/core/testing';
import { PlayComponent } from './play.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { QuizService } from '../../core/services/quiz.service';
import { AnswerService } from '../../core/services/answer.service';
import { setCurrentQuiz } from '../../store/actions/quiz.actions';
import { Quiz } from '../../shared/models/quizzes';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let mockStore: any;
  let mockRouter: any;
  let mockQuizService: any;
  let mockAnswerService: any;

  const mockQuiz: Quiz = {
    name: 'Test Quiz',
    questions: [
      { 
        question: 'What is 2+2?', 
        correct_answer: '4', 
        incorrect_answers: ['3', '5', '6'], 
        type: 'multiple', 
        category: 'Math', 
        difficulty: 'easy' 
      }
    ]
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockQuizService = jasmine.createSpyObj('QuizService', ['someMethod']);
    mockAnswerService = jasmine.createSpyObj('AnswerService', ['currentQuizResults', 'quizDuration']);
  
    mockStore.select.and.returnValue(of(mockQuiz));
    mockAnswerService.currentQuizResults = jasmine.createSpyObj('signal', ['set', 'update']);
    mockAnswerService.quizDuration = jasmine.createSpyObj('signal', ['set']);
  
    TestBed.configureTestingModule({
      imports: [PlayComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: QuizService, useValue: mockQuizService },
        { provide: AnswerService, useValue: mockAnswerService }
      ]
    });
  
    const fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to "/" if no quiz is present', () => {
    component.currentQuiz$ = of(null);
    
    component.startQuiz();
    
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start the quiz and load first question', () => {
    spyOn(component, 'loadQuestion');
    component.ngOnInit();
    expect(component.loadQuestion).toHaveBeenCalledWith(0);
  });
  
  it('should load and shuffle answers for the current question', () => {
    const shuffleSpy = spyOn<any>(component, 'shuffleAnswers').and.callThrough();
    component.loadQuestion(0);
  
    expect(shuffleSpy).toHaveBeenCalledWith(jasmine.arrayWithExactContents(['4', '3', '5', '6']));
    expect(component.questionWithAnswers?.answers.length).toBe(4);
  });  

  it('should proceed to the next question and record answer in AnswerService', () => {
    component.answers = [{ questionIndex: 0, answer: '4' }];
    component.currentQuestionIndex = 0;
    mockStore.select.and.returnValue(of(mockQuiz));

    component.nextQuestion();

    expect(mockAnswerService.currentQuizResults.update).toHaveBeenCalledWith(jasmine.any(Function));
    expect(component.currentQuestionIndex).toBe(1);
  });

  it('should finish quiz when last question is answered', () => {
    component.answers = [{ questionIndex: 0, answer: '4' }];
    component.currentQuestionIndex = 0;
    mockStore.select.and.returnValue(of(mockQuiz));

    spyOn(component, 'finishQuiz');
    component.nextQuestion();
    expect(component.finishQuiz).toHaveBeenCalled();
  });

  it('should set the quiz duration and navigate to "finish" on finishQuiz', () => {
    const startTime = Date.now() - 10000;
    component['startTime'] = startTime;

    component.finishQuiz();

    expect(mockAnswerService.quizDuration.set).toHaveBeenCalledWith(10);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/finish');
  });

  it('should cancel quiz and navigate to "/"', () => {
    component.cancelQuiz();
    expect(mockStore.dispatch).toHaveBeenCalledWith(setCurrentQuiz({ quiz: null }));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
