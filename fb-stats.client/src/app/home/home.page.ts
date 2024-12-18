import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Competition, CompetitionListResponse } from './competition-list.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data = new BehaviorSubject<Competition[] | null | undefined>([]);
  data$ = this.data.asObservable();
  skeletonCols = Array(8).fill(0).map((_, index) => index);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<CompetitionListResponse>("http://localhost:3000/api/v1/competitions")
      .subscribe({
        next: ({competitions}) => {
          this.data.next(competitions);
        }
      })
  }

  onCompetitionClick(id: number, title: string) {
    const normalizedTitle = title.split(" ").join("-");
    this.router.navigate([`/competitions/${id}/${normalizedTitle}`])
  }
}
