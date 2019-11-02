import { ProposalStatusState } from './proposal.status.model';
import {
  ProposalStatusActions,
  LOAD_PROPOSAL_STATUS_SUCCESS
} from './proposal.status.actions';
import { initialStatusState, adapter } from './proposal.status.init';

export function proposalStatusReducer(
  state: ProposalStatusState = initialStatusState,
  action: ProposalStatusActions
): ProposalStatusState {
  switch (action.type) {
    case LOAD_PROPOSAL_STATUS_SUCCESS: {
      return adapter.addAll(action.payload.proposalStatus, state);
    }

    default: {
      return state;
    }
  }
}
