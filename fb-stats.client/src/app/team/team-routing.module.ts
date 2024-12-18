import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamPage } from './team.page';

const routes: Routes = [
  {
    path: ':name/matches',
    component: TeamPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule {}
