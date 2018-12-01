import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function authenticationReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };
    case ActionTypes.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
        isLoading: false
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        accessToken: null,
        error: null,
        isLoading: false
      };
    case ActionTypes.RESTORE_AUTHENTICATION_STATE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.RESTORE_AUTHENTICATION_STATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}