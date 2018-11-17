import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConferenceService } from '../../../core/services/conference.service';
import { Conference } from '../../../core/models/conference.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  conferences$: Observable<Conference[]>;

  constructor(
    private conferenceService: ConferenceService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.conferences$ = this.conferenceService.getMany(1, this.authService.getUser().id);
  }

}
