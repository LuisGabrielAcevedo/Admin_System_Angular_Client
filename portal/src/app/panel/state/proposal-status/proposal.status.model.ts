import { ProposalStatus } from '../../api/get.proposalStatus.res';
import { EntityState } from '@ngrx/entity';

export interface ProposalStatusState extends EntityState<ProposalStatus> {
  selectedStatusCode: string | null;
}
