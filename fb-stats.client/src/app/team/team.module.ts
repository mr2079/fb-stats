import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { TeamPage } from './team.page';
import { TeamPageRoutingModule } from './team-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPage],
  providers: [
    provideHttpClient()
  ]
})
export class TeamPageModule {}
