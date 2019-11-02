import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlockingState } from './blocking.model';

export const selectBlockingState = createFeatureSelector<BlockingState>(
  'blocking'
);

export const blockingSelector = createSelector(
  selectBlockingState,
  (state: BlockingState) => state.blocking
);

export const blockingMessageSelector = createSelector(
  selectBlockingState,
  (state: BlockingState) => state.message
);
