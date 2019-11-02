import { ProposalDTO } from '../api/proposal';
export interface ProposalState {
  loading: boolean;
  proposal: ProposalDTO;
}
