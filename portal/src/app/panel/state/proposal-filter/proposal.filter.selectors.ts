import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProposalFilterState } from './proposal.filter.model';

export const selectProposalListState = createFeatureSelector<
  ProposalFilterState
>('proposal-filter');

export const proposalFilterSelector = createSelector(
  selectProposalListState,
  (state: ProposalFilterState) => state
);
