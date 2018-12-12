import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.createLoginForm();
    this.registerListeners();
    this.isLoading$ = this.store$.select(AuthenticationStoreSelectors.selectIsLoading);
    this.error$ = this.store$.select(AuthenticationStoreSelectors.selectError);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    const email = <string>this.loginForm.controls['email'].value;
    const password = <string>this.loginForm.controls['password'].value;
    this.store$.dispatch(new AuthenticationStoreActions.LoginRequestAction({
      email: email,
      password: password
    }));
  }

  registerListeners(): void {
    // Subscribe to LOGIN_SUCCESS action
    this.actions$.pipe(
      ofType<AuthenticationStoreActions.LoginSuccessAction>(AuthenticationStoreActions.ActionTypes.LOGIN_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['/', 'conferences']);
    });
  }

  private createLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

}
