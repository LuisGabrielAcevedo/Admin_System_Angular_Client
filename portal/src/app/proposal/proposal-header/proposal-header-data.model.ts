import { ProposalDTO } from '../api/proposal';

export interface ProposalHeaderData extends ProposalDTO {
  loading: boolean;
}
