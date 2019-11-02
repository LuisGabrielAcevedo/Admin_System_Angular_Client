import { ProposalListState } from './proposal.list.model';

export const initProposalListState: ProposalListState = {
  loading: false,
  pageSize: 20,
  totalElements: 0,
  pageNumber: 0,
  proposalResponseList: [],
  proposalMappedList: []
};
