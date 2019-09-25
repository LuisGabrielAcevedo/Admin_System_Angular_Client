import * as AppSettingsActions from "./app-settings.actions";
import { IRequests } from 'src/app/inferfaces/app-settings/loading';

export interface AppSettingsState {
  requests: IRequests
}

export const initialState: AppSettingsState = {
    requests: {}
};

export const getRequests = (state: AppSettingsState) => state.requests;

export function AppSettingsReducer(
  state = initialState,
  action: AppSettingsActions.Actions
): AppSettingsState {
  switch (action.type) {
    case AppSettingsActions.APP_SETTINGS_ADD_LOADING: {
      return {
        ... state,
        requests: { ... state.requests, [action.payload.id]: action.payload.request }
      }
    }
    case AppSettingsActions.APP_SETTINGS_REMOVE_LOADING: {
      const requests: IRequests = { ... state.requests};
      delete requests[action.payload];
      return {
        ... state, requests
      }
    }
    default: {
      return state;
    }
  }
}