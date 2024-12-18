import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { provideHttpClient } from '@angular/common/http';

import { HomePageRoutingModule } from './home-routing.module';
import { CompetitionPage } from './competition/competition.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CompetitionPage],
  providers: [
    provideHttpClient()
  ]
})
export class HomePageModule {}
