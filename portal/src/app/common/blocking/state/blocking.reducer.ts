import { BlockingState } from './blocking.model';
import { initBlockingState } from './blocking.init';
import {
  BlockingAction,
  BLOCKING_HIDE,
  BLOCKING_SHOW
} from './blocking.actions';

export function blockingReducer(
  state: BlockingState = initBlockingState,
  action: BlockingAction
): BlockingState {
  switch (action.type) {
    case BLOCKING_HIDE: {
      return {
        ...state,
        blocking: false
      };
    }
    case BLOCKING_SHOW: {
      return {
        blocking: true,
        message: action.payload.message ? action.payload.message : state.message
      };
    }

    default: {
      return state;
    }
  }
}
