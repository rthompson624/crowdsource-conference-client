import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ConferenceService } from '../../../core/services/conference.service';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  conference: Conference;
  errMessage: string;
  private ngUnsubscribe = new Subject();

  constructor(
    private conferenceService: ConferenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.conference = this.conferenceService.getNewObject();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSave(conference: Conference): void {
    this.conference = conference;
    this.conferenceService.create(conference).pipe(takeUntil(this.ngUnsubscribe)).subscribe(conference => {
      this.router.navigate(['../', conference.id.toString(10)], {relativeTo: this.route});
    },
    err => {
      this.errMessage = 'Error creating conference. ' + err;
    });
  }

}
