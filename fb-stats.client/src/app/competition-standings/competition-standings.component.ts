import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import CompetitionStandingsResponse from './competition-standings.interface';
import { HttpClient } from '@angular/common/http';

export class PeriodicElement {
  constructor(
    public rank: number,
    public title: string,
    public score: number,
    public playedMatches: number,
    public wonMatches: number,
    public lostMatches: number,
    public goalDifference: number
  ) { }
}

@Component({
  selector: 'app-competition-standings',
  imports: [MatTableModule],
  templateUrl: './competition-standings.component.html',
  styleUrl: './competition-standings.component.css'
})
export class CompetitionStandingsComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'title', 'playedMatches', 'wonMatches', 'lostMatches', 'goalDifference', 'score'];
  standingTable = new BehaviorSubject<PeriodicElement[]>([]);

  constructor(
    private readonly _http: HttpClient
  ) { }

  @Input() competitionId?: number | null | undefined;

  async ngOnInit(): Promise<void> {
    if (this.competitionId) {
      this._http.get<CompetitionStandingsResponse>(`http://localhost:3000/api/v1/competitions/${this.competitionId}/standings`)
        .subscribe({
          next: ({standings}) => {
            this.standingTable.next(
              standings!.map(s => 
                new PeriodicElement(
                  s.rank,
                  s.team.title,
                  s.score,
                  s.playedMatches,
                  s.wonMatches,
                  s.lostMatches,
                  s.goalDifference    
                )
              )
            );
          }
        })
    }
  }

  // async fetchStandingAsync(competitonId: number): Promise<CompetitionStandingsResponse> {
  //   return this._http.get<CompetitionStandingsResponse>(`http://localhost:3000/api/v1/competitions/${competitonId}/standings`);
  // }
}
