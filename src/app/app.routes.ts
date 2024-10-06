import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PlayComponent } from './features/play/play.component';
import { FinishComponent } from './features/finish/finish.component';
import { preventPlayWithoutSelectedQuizGuard } from './core/guards/prevent-play-without-selected-quiz.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'play', component: PlayComponent, canActivate: [preventPlayWithoutSelectedQuizGuard]},
  {path: 'finish', component: FinishComponent, canActivate: [preventPlayWithoutSelectedQuizGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
