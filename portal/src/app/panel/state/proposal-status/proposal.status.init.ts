import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProposalStatus } from '../../api/get.proposalStatus.res';
import { ProposalStatusState } from './proposal.status.model';

export const adapter: EntityAdapter<ProposalStatus> = createEntityAdapter<
  ProposalStatus
>();

export const initialStatusState: ProposalStatusState = adapter.getInitialState({
  selectedStatusCode: null
});
