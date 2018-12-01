import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/authentication.service';
import { AuthRequest } from '../../core/models/auth-request.model';
import { AuthResponse } from '../../core/models/auth-response.model';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import * as featureActions from './actions';
import { RootStoreState } from '../../root-store';

@Injectable()
export class AuthenticationStoreEffects {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  @Effect()
  createAccountRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreateAccountRequestAction>(
      featureActions.ActionTypes.CREATE_ACCOUNT_REQUEST
    ),
    switchMap(action => {
      const user: User = {
        email: action.payload.email,
        password: action.payload.password
      };
      return this.userService.create(user).pipe(
        map(user => new featureActions.CreateAccountSuccessAction(user)),
        catchError(error => {
          return observableOf(new featureActions.CreateAccountFailureAction({ error: this.formatCreateAccountError(error) }));
        })
	    );
    })
  );

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoginRequestAction>(
      featureActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action => {
      const authReq: AuthRequest = {
        strategy: 'local',
        email: action.payload.email,
        password: action.payload.password
      };
      return this.authService.authenticateUser(authReq).pipe(
        map(authRes => new featureActions.LoginSuccessAction(authRes)),
        catchError(error => {
          return observableOf(new featureActions.LoginFailureAction({ error: error.error.message }));
        })
	    );
    })
  );

  @Effect()
  logoutRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LogoutRequestAction>(
      featureActions.ActionTypes.LOGOUT_REQUEST
    ),
    switchMap(() => {
      return observableOf(this.authService.logoutUser()).pipe(
        map(() => new featureActions.LogoutSuccessAction())
	    );
    })
  );

  @Effect()
  restoreAuthenticationStateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.RestoreAuthenticationStateRequestAction>(
      featureActions.ActionTypes.RESTORE_AUTHENTICATION_STATE_REQUEST
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) => {
      // Check store before reloading from authService
      let authRes: AuthResponse;
      if (store.authentication.user) {
        authRes = {
          user: store.authentication.user,
          accessToken: store.authentication.accessToken
        };
      } else {
        if (this.authService.userIsAuthenticated()) {
          authRes = {
            user: this.authService.getUser(),
            accessToken: this.authService.getAccessToken()
          };
        } else {
          authRes = {
            user: null,
            accessToken: null
          };
        }
      }
      return observableOf(new featureActions.RestoreAuthenticationStateSuccessAction(authRes));
    })
  );

  private formatCreateAccountError(error: any): string {
    if (error.error && error.error.errors && error.error.errors.length) {
      switch (error.error.errors[0].message) {
        case 'email must be unique':
          return 'An account for this email already exists.';
        default:
          return error.error.errors[0].message;
      }
    }
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error) return error.error.toString();
    if (error) return error.toString();
  }

}