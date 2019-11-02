import { ProposalState } from './proposal.model';
import { proposalInitialState } from './proposal.init';
import { ProposalActions, LOAD, LOAD_SUCCESS, RESET } from './proposal.actions';

export function proposalReducer(
  state: ProposalState = proposalInitialState,
  action: ProposalActions
): ProposalState {
  switch (action.type) {
    case LOAD: {
      return { ...state, loading: true };
    }
    case LOAD_SUCCESS: {
      return { proposal: { ...action.payload.proposal }, loading: false };
    }
    case RESET: {
      return proposalInitialState;
    }
    default: {
      return state;
    }
  }
}
