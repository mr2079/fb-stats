import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  CompetitionStandingResponse,
  Standing,
} from './competition-standing.interface';

@Component({
  selector: 'app-competition',
  templateUrl: 'competition.page.html',
  styleUrls: ['competition.page.scss'],
})
export class CompetitionPage implements OnInit {
  data = new BehaviorSubject<Standing[] | null | undefined>([]);
  data$ = this.data.asObservable();
  header: string | null = ("" + this.route.snapshot.params['title']).split("-").join(" ");
  skeletonRows = Array(16).fill(0).map((_, index) => index);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly router: Router 
  ) {}

  ngOnInit(): void {
    const competitionId: string | null = this.route.snapshot.params['id'];
    this.http
      .get<CompetitionStandingResponse>(
        `http://localhost:3000/api/v1/competitions/${competitionId}/standing`
      )
      .subscribe({
        next: ({ standing }) => {
          this.data.next(standing);
        },
      });
  }

  onTeamClick(name: string) {
    const normalizedName = name.toLowerCase().split(" ").join("-");
    this.router.navigate([`/teams/${normalizedName}/matches`])
  }
}
