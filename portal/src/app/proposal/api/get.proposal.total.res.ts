export interface Total {
  id: number;
  count: number;
  proposalStatus: string;
}

export interface GetProposalTotalResponse {
  monthlyTotals: Total[];
  weeklyTotals: Total[];
  lastThreeDaysTotals: Total[];
}
