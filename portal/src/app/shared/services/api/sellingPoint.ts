export interface SellingPoint {
  agentCode?: string;
  allowSeg?: string;
  branchCode?: string; // sucursal suggerida
  city?: string;
  concierges?: Concierge[];
  idSellingPoint?: number;
  integrationCode?: string;
  name?: string;
  sellingPointCode?: string;
  strategyCode?: string;
}
