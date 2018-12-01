import { Action } from '@ngrx/store';
import { Conference } from '../../core/models/conference.model';
import { Multiple } from '../../core/models/multiple.model';

export enum ActionTypes {
  LOAD_MANY = 'Conferences Load Request',
  LOAD_MANY_SUCCESS = 'Conferences Load Success',
  LOAD_ONE = 'Conference Load Request',
  LOAD_ONE_SUCCESS = 'Conference Load Success',
  DELETE = 'Conference Delete Request',
  DELETE_SUCCESS = 'Conference Delete Success',
  UPDATE = 'Conference Update Request',
  UPDATE_SUCCESS = 'Conference Update Success',
  CREATE = 'Conference Create Request',
  CREATE_SUCCESS = 'Conference Create Success',
  FAILURE = 'Conference Failure'
}

export class LoadManyAction implements Action {
  readonly type = ActionTypes.LOAD_MANY;
  constructor(public payload: { pageIndex: number }) {}
}

export class LoadManySuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MANY_SUCCESS;
  constructor(public payload: Multiple<Conference>) {}
}

export class LoadOneAction implements Action {
  readonly type = ActionTypes.LOAD_ONE;
  constructor(public payload: { id: number }) {}
}

export class LoadOneSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ONE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: Conference) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: Conference) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: Conference) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions = 
  LoadManyAction|
  LoadManySuccessAction|
  LoadOneAction|
  LoadOneSuccessAction|
  DeleteAction|
  DeleteSuccessAction|
  UpdateAction|
  UpdateSuccessAction|
  CreateAction|
  CreateSuccessAction|
  FailureAction
;
