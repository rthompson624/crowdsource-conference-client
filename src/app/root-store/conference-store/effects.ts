import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ConferenceService } from '../../core/services/conference.service';
import * as featureActions from './actions';
import { RootStoreState } from '../../root-store';

@Injectable()
export class ConferenceStoreEffects {
  constructor(
    private dataService: ConferenceService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  @Effect()
  loadManyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadManyAction>(
      featureActions.ActionTypes.LOAD_MANY
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) => {
      let pageIndex = action.payload.pageIndex;
      // If page index is null use what the store has
      if (pageIndex === null) {
        if (store.conference.page.skip) {
          pageIndex = store.conference.page.skip / store.conference.page.limit;
        } else {
          pageIndex = 0;
        }
      }
      return this.dataService.getMany(pageIndex, store.authentication.user.id).pipe(
        map(response =>
          new featureActions.LoadManySuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error }))
        )
      )
    })
  );
  
  @Effect()
  loadOneEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadOneAction>(
      featureActions.ActionTypes.LOAD_ONE
    ),
    switchMap(action =>
      this.dataService.getOne(action.payload.id).pipe(
        map(response =>
          new featureActions.LoadOneSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  DeleteEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.DeleteAction>(
      featureActions.ActionTypes.DELETE
    ),
    switchMap(action =>
      this.dataService.delete(action.payload).pipe(
        map(() =>
          new featureActions.DeleteSuccessAction(action.payload)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  UpdateEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateAction>(
      featureActions.ActionTypes.UPDATE
    ),
    switchMap(action =>
      this.dataService.update(action.payload).pipe(
        map(response =>
          new featureActions.UpdateSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  CreateEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreateAction>(
      featureActions.ActionTypes.CREATE
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store])  => {
      action.payload.host_id = store.authentication.user.id;
      return this.dataService.create(action.payload).pipe(
        map(response =>
          new featureActions.CreateSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error }))
        )
      )
    })
  );

}