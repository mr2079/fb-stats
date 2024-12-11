import { Routes } from '@angular/router';
import { CompetitionTabsComponent } from './competition-tabs/competition-tabs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'competitions',
    pathMatch: 'full',
  },
  {
    path: 'competitions',
    component: CompetitionTabsComponent,
  },
  {
    path: '**',
    redirectTo: 'competitions',
    pathMatch: 'full',
  },
];
