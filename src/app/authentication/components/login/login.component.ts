import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { AuthRequest } from '../../../core/models/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showSpinner: boolean = false;
  authenticationFailed: boolean = false;
  errorMessage: string;
  private ngUnsubscribe = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.authenticationFailed = false;
    this.showSpinner = true;
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];
    const authReq: AuthRequest = {
      strategy: 'local',
      email: email.value,
      password: password.value
    };
    this.authService.authenticateUser(authReq).pipe(takeUntil(this.ngUnsubscribe)).subscribe(authRes => {
      // Authentication successfull
      this.showSpinner = false;
      this.router.navigate(['/', 'conferences']);
    },
    err => {
      // Authentication failed
      if (err.error.message === 'Invalid login') {
        this.errorMessage = 'No account exists for the email and password entered.'
      } else {
        this.errorMessage = err.error.message;
        console.log(err);
      }
      this.showSpinner = false;
      this.authenticationFailed = true;
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
