import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConferenceStoreSelectors } from './conference-store';
import { AuthenticationStoreSelectors } from './authentication-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  ConferenceStoreSelectors.selectConferenceError,
  AuthenticationStoreSelectors.selectError,
  (conference: string, authentication: string) => {
    return conference || authentication;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  ConferenceStoreSelectors.selectConferenceIsLoading,
  AuthenticationStoreSelectors.selectIsLoading,
  (conference: boolean, authentication: boolean) => {
    return conference || authentication;
  }
);
