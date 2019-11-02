export interface ProposalStatusDTO {
  phaseProcessStatus: string; // ONGOING, NOT_RUNNING, LAST_PROCESS_ERROR
  description: string;
  code: string;
  group: string;
}
