import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProposalSellingPointState } from './proposal.selling.model';

export const selectProposalListState = createFeatureSelector<
  ProposalSellingPointState
>('proposal-selling');

export const proposalSellingSelector = createSelector(
  selectProposalListState,
  (state: ProposalSellingPointState) => state
);
