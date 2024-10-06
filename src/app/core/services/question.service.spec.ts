import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { ApiResponse } from '../../shared/models/questions';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;
  const mockApiResponse: ApiResponse = {
    response_code: 0,
    results: [
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["Berlin", "Madrid", "Rome"]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService]
    });

    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve questions from the API', () => {
    service.getQuestions().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne('https://opentdb.com/api.php?amount=50');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
