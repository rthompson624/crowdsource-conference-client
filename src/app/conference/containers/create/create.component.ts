import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Conference } from '../../../core/models/conference.model';
import { RootStoreState, ConferenceStoreActions } from '../../../root-store';

@Component({
  selector: 'app-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  conference: Conference = {
    name: null,
    host_id: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.registerListeners();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onSave(conference: Conference): void {
    this.store$.dispatch(new ConferenceStoreActions.CreateAction(conference));
  }

  registerListeners(): void {
    // Subscribe to CREATE_SUCCESS action
    this.actions$.pipe(
      ofType<ConferenceStoreActions.CreateSuccessAction>(ConferenceStoreActions.ActionTypes.CREATE_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['../', action.payload.id.toString(10)], {relativeTo: this.route});
    });
  }

}
