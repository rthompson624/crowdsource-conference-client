import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Conference } from '../../core/models/conference.model';
import { featureAdapter, State } from './state';
import { Page } from '../../core/models/page.model';

export const getPage = (state: State): Page => state.page;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;

// Parameter (case-sensitive) in createFeatureSelector() must match parameter in StoreModule.forFeature() call in xxxxx-store.module.ts
export const selectConferenceState: MemoizedSelector<object, State> = createFeatureSelector<State>('conference');

export const selectAllConferenceItems: (state: object) => Conference[] = featureAdapter.getSelectors(selectConferenceState).selectAll;

export const selectConferenceById = (id: number) =>
  createSelector(selectAllConferenceItems, (allConferences: Conference[]) => {
    if (allConferences) {
      return allConferences.find(item => item.id === id);
    } else {
      return null;
    }
  });

export const selectConferencePage: MemoizedSelector<object, Page> = createSelector(selectConferenceState, getPage);
export const selectConferenceError: MemoizedSelector<object, any> = createSelector(selectConferenceState, getError);
export const selectConferenceIsLoading: MemoizedSelector<object, boolean> = createSelector(selectConferenceState, getIsLoading);
