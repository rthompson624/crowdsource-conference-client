import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

import { ConferenceService } from '../../../core/services/conference.service';
import { Multiple } from '../../../core/models/multiple.model';
import { Conference } from '../../../core/models/conference.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  conferences$: Observable<Multiple<Conference>>;
  columns: string[] = ['name', 'updatedAt'];

  constructor(
    private conferenceService: ConferenceService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadConferences(0);
  }

  selectConference(conference: Conference): void {
    this.router.navigate([conference.id.toString(10)], {relativeTo: this.route});
  }

  onLoad(event: PageEvent) {
    this.loadConferences(event.pageIndex);
  }

  private loadConferences(page: number): void {
    this.conferences$ = this.conferenceService.getMany(page, this.authService.getUser().id);
  }

}
