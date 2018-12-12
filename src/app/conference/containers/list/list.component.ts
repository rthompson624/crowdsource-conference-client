import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import { Conference } from '../../../core/models/conference.model';
import { RootStoreState, ConferenceStoreActions, ConferenceStoreSelectors } from '../../../root-store';
import { Page } from '../../../core/models/page.model';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  columns: string[] = ['name', 'updatedAt'];
  conferences$: Observable<Conference[]>;
  page$: Observable<Page>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.conferences$ = this.store$.select(ConferenceStoreSelectors.selectAllConferenceItems);
    this.page$ = this.store$.select(ConferenceStoreSelectors.selectConferencePage);
    this.loadConferences(null); // Null signifies use page in store
  }

  selectConference(conference: Conference): void {
    this.router.navigate([conference.id.toString(10)], {relativeTo: this.route});
  }

  onLoad(event: PageEvent) {
    this.loadConferences(event.pageIndex);
  }

  private loadConferences(pageIndex: number): void {
    this.store$.dispatch(
      new ConferenceStoreActions.LoadManyAction({pageIndex: pageIndex})
    );
  }

}
