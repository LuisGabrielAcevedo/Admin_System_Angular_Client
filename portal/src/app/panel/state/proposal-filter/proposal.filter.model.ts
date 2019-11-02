import { ProposalStatus } from '../../api/get.proposalStatus.res';
export interface ProposalFilterState {
  startDate: DateApp;
  today: DateApp;
  fromDateLimit: DateApp;
  endDate: DateApp;
  proposalStatus: string;
  document: string;
  sellingPointCode: string;
}

export interface DateApp {
  year: number;
  month: number;
  day: number;
}
