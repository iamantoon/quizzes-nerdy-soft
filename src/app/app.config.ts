import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideStore, provideState } from '@ngrx/store';
import { questionReducer } from './store/reducers/question.reducer';
import { provideEffects } from '@ngrx/effects';
import { QuestionEffects } from './store/effects/question.effects';
import { QuizEffects } from './store/effects/quiz.effects';
import { quizReducer } from './store/reducers/quiz.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
    provideStore(),
    provideEffects(QuestionEffects, QuizEffects),
    provideState({name: 'question', reducer: questionReducer}),
    provideState({name: 'quiz', reducer: quizReducer})
  ]
};
