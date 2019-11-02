import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from './proposal.status.init';
import { ProposalStatusState } from './proposal.status.model';
const selectors = adapter.getSelectors();

export const selectProposalStatusState = createFeatureSelector<
  ProposalStatusState
>('proposal-status');

export const selectProposalStatusEntities = createSelector(
  selectProposalStatusState,
  selectors.selectEntities
);
export const selectAllProposalStatus = createSelector(
  selectProposalStatusState,
  selectors.selectAll
);
export const selectProposalStatusTotal = createSelector(
  selectProposalStatusState,
  selectors.selectTotal
);
export const selectProposalStatusId = createSelector(
  selectProposalStatusState,
  selectors.selectIds
);
