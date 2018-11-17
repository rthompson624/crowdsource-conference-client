import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConferenceService } from '../../../core/services/conference.service';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  conference$: Observable<Conference>;
  errMessage: string;
  private ngUnsubscribe = new Subject();

  constructor(
    private conferenceService: ConferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.conference$ = this.activatedRoute.paramMap.pipe(
      switchMap(
        paramMap => this.conferenceService.getOne(parseInt(paramMap.get('id')))
      )
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSave(conference: Conference): void {
    this.conferenceService.update(conference).pipe(takeUntil(this.ngUnsubscribe)).subscribe(updated => {
      this.router.navigate(['/', 'conferences', updated.id.toString(10)]);
    });
  }

}
