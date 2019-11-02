export interface VehiclePatch {
  adapted: boolean;
  brand: {
    description: string;
    id: number;
    inactive: boolean;
    integrationCode: string;
    organizationId: number;
  };
  chassisNumber: string;
  commercialVehicle: boolean;
  domainNumber: string;
  engineNumber: string;
  fuelYear: {
    description: string;
    fuelType: string;
    id: number;
    inactive: boolean;
    integrationCode: string;
    organizationId: number;
    origin: string;
    year: number;
    zeroKm: boolean;
  };
  gnc: string;
  hasFleetInsurance: boolean;
  model: {
    description: string;
    disabled: boolean;
    id: number;
    integrationCode: string;
    organizationId: number;
  };
  purchaseValue: number;
  taxi: boolean;
  used: boolean;
  vehicleType: {
    description: string;
    filter: string;
    id: number;
    inativo: boolean;
    organizationId: number;
  };
}
