import { ConferenceStoreState } from './conference-store';
import { AuthenticationStoreState } from './authentication-store';

export interface State {
  conference: ConferenceStoreState.State;
  authentication: AuthenticationStoreState.State;
}
