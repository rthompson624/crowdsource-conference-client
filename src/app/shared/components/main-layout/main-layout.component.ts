import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private store$: Store<RootStoreState.State>,
    private actions$: Actions,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerListeners();
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
    this.store$.dispatch(new AuthenticationStoreActions.RestoreAuthenticationStateRequestAction());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onLogout(): void {
    this.store$.dispatch(new AuthenticationStoreActions.LogoutRequestAction());
  }

  registerListeners(): void {
    // Subscribe to LOGOUT_SUCCESS action
    this.actions$.pipe(
      ofType<AuthenticationStoreActions.LogoutSuccessAction>(AuthenticationStoreActions.ActionTypes.LOGOUT_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['/', 'authentication', 'login']);
    });
  }

}
