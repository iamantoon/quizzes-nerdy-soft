import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http = inject(HttpClient);
  private baseUrl = 'https://opentdb.com/api.php?amount=50';

  getQuestions() {
    return this.http.get<ApiResponse>(this.baseUrl);
  }
}
