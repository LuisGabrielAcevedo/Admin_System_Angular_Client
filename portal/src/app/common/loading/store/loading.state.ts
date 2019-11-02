import { createFeatureSelector } from '@ngrx/store';

export interface LoadingState {
  ongoingRequests: any;
}

export const initialLoadingState: LoadingState = {
  ongoingRequests: {}
};

export const loadingSelector = createFeatureSelector<LoadingState>('loading');
