import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient } from '@angular/common/http';
import { CompetitionItemsResponse, CompetitionTab } from './competition-tabs.interface';

@Component({
  selector: 'competition-tabs',
  templateUrl: 'competition-tabs.component.html',
  imports: [MatTabsModule, AsyncPipe, MatProgressBarModule],
})
export class CompetitionTabsComponent implements OnInit {
  competitionTabs!: Observable<CompetitionTab[]>;
  selectedCompetitionId!: Observable<number>;

  constructor(private readonly _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<CompetitionItemsResponse>("http://localhost:3000/api/v1/competitions")
      .subscribe({
        next: ({competitions})=>{
          this.competitionTabs = new Observable<CompetitionTab[]>(observer => {
            observer.next(
              competitions?.map(item => {
                return new CompetitionTab(item.id, item.title);
              })
            )
          })
        }
      })
  }
}
