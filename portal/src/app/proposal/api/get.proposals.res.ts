export interface ProposalSummaryDTO {
  proposalId: number;
  creationDate: string;
  dni: string;
  nameAndLastName: string;
  vehicleBrandAndModel: string;
  financedAmount: number;
  status?: any;
}
