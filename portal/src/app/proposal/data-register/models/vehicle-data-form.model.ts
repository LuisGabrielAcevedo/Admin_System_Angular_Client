export interface VehicleDataForm {
  brand: {
    id: number;
    description: string;
  };
  model: {
    id: number;
    description: string;
  };
  year: number;
  useType: {
    id: number;
    description: string;
    code: string;
  };
  chassisData: {
    chassisNumber: string;
    confirmChassisNumber: string;
  };
  engineData: {
    engineNumber: string;
    confirmEngineNumber: string;
  };
  isUsedData: {
    gnc: string;
    domainNumber: string;
  };
  isPymeData: {
    isCommercialVehicle: boolean;
    hasFleetInsurance: boolean;
  };
}
