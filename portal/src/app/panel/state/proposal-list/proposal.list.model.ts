export interface ProposalListState {
  pageSize: number;
  loading: boolean;
  pageNumber: number;
  proposalResponseList: any[];
  proposalMappedList: ProposalSummary[];
  totalElements: number;
}

export interface ProposalSummary {
  proposalNumber: number;
  creationDate: Date;
  financedAmount: number;
  document: string;
  vehicleName: string;
  firstName: string;
  lastName: string;
  statusGroup: string;
  status: string;
  pillColor: string;
}
