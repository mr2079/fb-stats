import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient } from '@angular/common/http';
import {
  CompetitionItemsResponse,
  CompetitionTab,
} from './competition-tabs.interface';
import { CompetitionStandingsComponent } from "../competition-standings/competition-standings.component";

@Component({
  selector: 'competition-tabs',
  templateUrl: 'competition-tabs.component.html',
  styleUrl: 'competition-tabs.component.css',
  imports: [MatTabsModule, AsyncPipe, MatProgressBarModule, CompetitionStandingsComponent],
})
export class CompetitionTabsComponent implements OnInit {
  competitionTabs = new BehaviorSubject<CompetitionTab[]>([]);
  selectedCompetitionId = new BehaviorSubject<number | null | undefined>(null);

  constructor(private readonly _http: HttpClient) {}

  ngOnInit(): void {
    this._http
      .get<CompetitionItemsResponse>(
        'http://localhost:3000/api/v1/competitions'
      )
      .subscribe({
        next: ({ competitions }) => {
          this.competitionTabs.next(
            competitions?.map((item) =>
               new CompetitionTab(item.id, item.title)) ?? []
          );
          this.selectedCompetitionId.next(
            this.competitionTabs.getValue()[0].id
          );
        }
      });
  }
}
