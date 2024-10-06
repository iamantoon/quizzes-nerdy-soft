import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizState } from '../../store/reducers/quiz.reducer';
import { map, take } from 'rxjs';
import { selectCurrentQuiz } from '../../store/selectors/quiz.selectors';

export const preventPlayWithoutSelectedQuizGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<QuizState>);

  return store.select(selectCurrentQuiz).pipe(
    take(1),
    map((currentQuiz) => {
      if (currentQuiz) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};
