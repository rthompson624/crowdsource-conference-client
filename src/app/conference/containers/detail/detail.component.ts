import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConferenceService } from '../../../core/services/conference.service';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  conference$: Observable<Conference>;
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

  editConference(conference: Conference): void {
    this.router.navigate(['/', 'conferences', String(conference.id), 'edit']);
  }

  deleteConference(conference: Conference): void {
    // TODO: Confirm with dialog, then delete and navigate to list page
    console.log('Need to delete:');
    console.log(conference);
  }

}
