import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Match, TeamMatchesResponse } from './team-matches.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: 'team.page.html',
  styleUrls: ['team.page.scss'],
})
export class TeamPage implements OnInit {
  lastMatches = new BehaviorSubject<Match[] | null | undefined>([]);
  nextMatches = new BehaviorSubject<Match[] | null | undefined>([]);
  lastMatches$ = this.lastMatches.asObservable();
  nextMatches$ = this.nextMatches.asObservable();
  skeletonRows = Array(5).fill(0).map((_, index) => index);

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    const name: string | null = this.route.snapshot.params["name"];
    this.http.get<TeamMatchesResponse>(`http://localhost:3000/api/v1/teams/${name}/matches`)
      .subscribe({
        next: ({matches}) => {
          this.lastMatches.next(matches?.lastMatches);
          this.nextMatches.next(matches?.nextMatches);
        }
      })
  }
}
