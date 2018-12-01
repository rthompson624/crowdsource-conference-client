import { Action } from '@ngrx/store';
import { AuthResponse } from '../../core/models/auth-response.model';
import { User } from '../../core/models/user.model';

export enum ActionTypes {
  CREATE_ACCOUNT_REQUEST = 'Create Account Request',
  CREATE_ACCOUNT_FAILURE = 'Create Account Failure',
  CREATE_ACCOUNT_SUCCESS = 'Create Account Success',
  LOGIN_REQUEST = 'Login Request',
  LOGIN_FAILURE = 'Login Failure',
  LOGIN_SUCCESS = 'Login Success',
  LOGOUT_REQUEST = 'Logout Request',
  LOGOUT_SUCCESS = 'Logout Success',
  RESTORE_AUTHENTICATION_STATE_REQUEST = 'Restore Authentication State Request',
  RESTORE_AUTHENTICATION_STATE_SUCCESS = 'Restore Authentication State Success'
}

export class CreateAccountRequestAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}

export class CreateAccountFailureAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateAccountSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class LogoutRequestAction implements Action {
  readonly type = ActionTypes.LOGOUT_REQUEST;
  constructor() {}
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

export class RestoreAuthenticationStateRequestAction implements Action {
  readonly type = ActionTypes.RESTORE_AUTHENTICATION_STATE_REQUEST;
  constructor() {}
}

export class RestoreAuthenticationStateSuccessAction implements Action {
  readonly type = ActionTypes.RESTORE_AUTHENTICATION_STATE_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export type Actions = 
  CreateAccountRequestAction |
  CreateAccountFailureAction |
  CreateAccountSuccessAction |
  LoginRequestAction |
  LoginFailureAction |
  LoginSuccessAction |
  LogoutRequestAction |
  LogoutSuccessAction |
  RestoreAuthenticationStateRequestAction |
  RestoreAuthenticationStateSuccessAction
;