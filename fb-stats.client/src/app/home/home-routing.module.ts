import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CompetitionPage } from './competition/competition.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':id/:title',
    component: CompetitionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
