export interface SellingPointFeatures {
  carEnabled: boolean;
  sellingPointActive: boolean;
  utilitarianEnabled: boolean;
}

export interface UserSellingPoint {
  id: number;
  name: string;
  code: string;
  features: SellingPointFeatures;
}
