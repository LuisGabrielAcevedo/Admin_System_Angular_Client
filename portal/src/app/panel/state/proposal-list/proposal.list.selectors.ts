import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProposalListState } from './proposal.list.model';

export const selectProposalListState = createFeatureSelector<ProposalListState>(
  'proposal-list'
);

export const proposalListSelector = createSelector(
  selectProposalListState,
  (state: ProposalListState) => state
);
