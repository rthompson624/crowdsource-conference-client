import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { AuthRequest } from '../../../core/models/auth-request.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  errorMessage: string;
  showSpinner: boolean = false;
  accountCreationFailed: boolean = false;
  authenticationFailed: boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createaccountForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.accountCreationFailed = false;
    this.authenticationFailed = false;
    this.errorMessage = '';
    const email = this.accountForm.controls['email'];
    const password = this.accountForm.controls['password'];
    const passwordEnterAgain = this.accountForm.controls['passwordEnterAgain'];
    if (password.value != passwordEnterAgain.value) {
      password.setValue('');
      passwordEnterAgain.setValue('');
      this.errorMessage = 'The passwords you entered did not match. Please try again.';
      this.showSpinner = false;
    } else {
      // Create new user account
      const user: User = {
        email: email.value,
        password: password.value
      };
      this.userService.create(user).pipe(takeUntil(this.ngUnsubscribe)).subscribe(newUser => {
        // Account created. Now login and navigate to home page.
        const authReq: AuthRequest = {
          strategy: 'local',
          email: email.value,
          password: password.value
        };
        this.authService.authenticateUser(authReq).pipe(takeUntil(this.ngUnsubscribe)).subscribe(authRes => {
          // Authentication successfull
          this.showSpinner = false;
          this.router.navigate(['/']);
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
      },
      err => {
        // Account creation failed
        if (err.error.errors[0].message === 'email must be unique') {
          this.accountCreationFailed = true;
          this.errorMessage = 'An account for this email already exists.';
        }
        this.showSpinner = false;
      });
    }
  }

  private createaccountForm(): void {
    this.accountForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordEnterAgain: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

}
