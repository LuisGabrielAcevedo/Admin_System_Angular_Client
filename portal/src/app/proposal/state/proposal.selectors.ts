import { SELLING_POINT_TYPE } from '@app/constants/panel.contants';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProposalHeaderData } from '../proposal-header/proposal-header-data.model';
import { ProposalState } from './proposal.model';

export const selectProposal = createFeatureSelector<ProposalState>('proposal');

export const proposalSelector = createSelector(
  selectProposal,
  (state: ProposalState) => state
);

export const proposalHeaderSelector = createSelector(
  selectProposal,
  (state: ProposalState) => {
    const proposal = state.proposal;
    return {
      ...proposal,
      loading: state.loading
    } as ProposalHeaderData;
  }
);
export const proposalIdSelector = createSelector(
  selectProposal,
  (state: ProposalState) => '' + state.proposal.proposalNumber
);

export const proposalPanelHeaderSelector = createSelector(
  selectProposal,
  (state: ProposalState) => {
    const proposal = state.proposal;
    return {
      account:
        proposal.account && proposal.account.accountDTO
          ? proposal.account.accountDTO.accountNumber
          : '',
      cStore:
        proposal.store.strategyCode !== SELLING_POINT_TYPE.BRANCH
          ? proposal.store.branchCode
          : false,
      sConcierge:
        proposal.store.strategyCode === SELLING_POINT_TYPE.BRANCH &&
        proposal.account &&
        proposal.account.conciergeDTO
          ? proposal.account.conciergeDTO.name
          : null,
      proposalNumber: proposal.proposalNumber,
      state: proposal.status ? proposal.status.proposalStatusDescription : '',
      phases: proposal.phases
    };
  }
);
export const proposalPanelSelector = createSelector(
  selectProposal,
  (state: ProposalState) => {
    const proposal = state.proposal;
    return {
      proposalNumber: proposal.proposalNumber,
      owner: proposal.owner,
      coOwner: proposal.coOwner,
      vehicle: proposal.vehicle,
      scoring: proposal.scoring,
      insurance: proposal.insurance ? proposal.insurance : null,
      store: proposal.store,
      phases: proposal.phases,
      account: proposal.account,
      commentsList: proposal.commentsList,
      pledgeType: proposal.pledgeType
    };
  }
);
