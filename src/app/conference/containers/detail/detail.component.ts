import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ConferenceService } from '../../../core/services/conference.service';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  conference$: Observable<Conference>;
  private ngUnsubscribe = new Subject();
  id: number;

  constructor(
    private conferenceService: ConferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.conference$ = this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => {
        this.id = parseInt(paramMap.get('id'));
        return this.conferenceService.getOne(parseInt(paramMap.get('id')));
      })
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editConference(conference: Conference): void {
    this.router.navigate(['/', 'conferences', String(conference.id), 'edit']);
  }

  deleteConference(conference: Conference): void {
    this.conferenceService.delete(conference).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.router.navigate(['/', 'conferences']);
    });
  }

}
