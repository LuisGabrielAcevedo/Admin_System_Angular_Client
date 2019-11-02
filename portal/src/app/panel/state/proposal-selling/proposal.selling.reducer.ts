import { ProposalSellingPointState } from './proposal.selling.model';
import { initProposalSellingState } from './proposal.selling.init';
import { ProposalSellingctions, SET_SELLING } from './proposal.selling.actions';

export function proposalSellingReducer(
  state: ProposalSellingPointState = initProposalSellingState,
  action: ProposalSellingctions
): ProposalSellingPointState {
  switch (action.type) {
    case SET_SELLING: {
      return {
        ...state,
        ...action.payload.sellingPoint
      };
    }

    default: {
      return state;
    }
  }
}
