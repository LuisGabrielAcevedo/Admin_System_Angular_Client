import { LoadingActionTypes, LoadingAction } from './loading.actions';
import { ActionReducerMap } from '@ngrx/store';
import { LoadingState } from './loading.state';

export function ongoingRequestsReducer(state = {}, action: LoadingAction) {
  switch (action.type) {
    case LoadingActionTypes.ADD_REQUEST:
      return {
        ...state,
        [action.payload.id]: action.payload.request
      };
    case LoadingActionTypes.REMOVE_REQUEST:
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;

    default:
      return state;
  }
}

/**
 * Reducer Map
 */

export const reducerMap: ActionReducerMap<LoadingState> = {
  ongoingRequests: ongoingRequestsReducer
};
