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
  data = new BehaviorSubject<Match[] | null | undefined>([]);
  data$ = this.data.asObservable();
  // skeletonCols = Array(8).fill(0).map((_, index) => index);

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    const name: string | null = this.route.snapshot.params["name"];
    this.http.get<TeamMatchesResponse>(`http://localhost:3000/api/v1/teams/${name}/matches`)
      .subscribe({
        next: ({matches}) => {
          this.data.next(matches);
        }
      })
  }
}
