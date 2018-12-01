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
  selector: 'app-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
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

  onSave(conference: Conference): void {
    this.store$.dispatch(new ConferenceStoreActions.UpdateAction(conference));
  }

  registerListeners(): void {
    // Subscribe to UPDATE_SUCCESS action
    this.actions$.pipe(
      ofType<ConferenceStoreActions.UpdateSuccessAction>(ConferenceStoreActions.ActionTypes.UPDATE_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
