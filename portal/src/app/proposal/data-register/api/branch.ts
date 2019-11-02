export interface BranchResponse {
  idSellingPoint: number;
  name: string;
  sellingPointCode: string;
  strategyCode: string;
  agentCode: string;
  integrationCode: string;
  concierges?: any[];
  city: string;
}

export interface Branch {
  idSellingPoint: number;
  name: string;
  sellingPointCode: string;
  strategyCode: string;
  agentCode: string;
  integrationCode: string;
  // concierges: any[];
}
