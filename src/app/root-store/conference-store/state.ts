import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Conference } from '../../core/models/conference.model';
import { Page } from '../../core/models/page.model';

export const featureAdapter: EntityAdapter<Conference> = createEntityAdapter<Conference>({
  selectId: model => model.id,
  sortComparer: (a: Conference, b: Conference): number =>
    a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Conference> {
  page?: Page;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  page: {
    total: null,
    limit: null,
    skip: 0
  },
  isLoading: false,
  error: null
});
