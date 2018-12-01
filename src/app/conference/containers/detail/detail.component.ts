import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';

import { Conference } from '../../../core/models/conference.model';
import { RootStoreState, ConferenceStoreActions, ConferenceStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  conference$: Observable<Conference>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.conference$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(new ConferenceStoreActions.LoadOneAction({ id: parseInt(paramMap.get('id'))}));
        return this.store$.select(ConferenceStoreSelectors.selectConferenceById(parseInt(paramMap.get('id'))));
      })
    );
    this.registerListeners();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  editConference(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteConference(conference: Conference): void {
    this.store$.dispatch(new ConferenceStoreActions.DeleteAction(conference));
  }

  registerListeners(): void {
    // Subscribe to DELETE_SUCCESS action
    this.actions$.pipe(
      ofType<ConferenceStoreActions.DeleteSuccessAction>(ConferenceStoreActions.ActionTypes.DELETE_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
