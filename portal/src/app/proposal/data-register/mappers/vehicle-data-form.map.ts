import { ProposalDTO } from '@app/proposal/api';
import { VehicleDataForm } from '../models/vehicle-data-form.model';
import { Vehicle } from '@app/proposal/api/proposal';

export function GetProposalRes2VehicleDataForm(
  getProposalRes: ProposalDTO
): VehicleDataForm {
  let result: VehicleDataForm;
  const vehicle: Vehicle = getProposalRes.vehicle;
  if (getProposalRes) {
    result = { ...Vehicle2VehicleDataForm(vehicle) };
    return result;
  }
}

/**
 * Maps the values of a Vehicle Data Form to Patch Vehicle
 * @param vehicleDataForm The object from the vehicle data form
 */
export function VehicleDataForm2PatchVehicle(
  vehicleDataForm: VehicleDataForm
): Partial<Vehicle> {
  let result: Partial<Vehicle>;
  if (vehicleDataForm) {
    result = {
      ...VehicleDataForm2Vehicle(vehicleDataForm)
    };
    return result;
  }
}

export function Vehicle2VehicleDataForm(vehicle: Vehicle): VehicleDataForm {
  const {
    brand,
    model,
    useType,
    fuelYear: { year },
    chassisNumber,
    engineNumber,
    gnc,
    domainNumber,
    commercialVehicle: isCommercialVehicle,
    hasFleetInsurance
  } = vehicle;

  const result: VehicleDataForm = {
    brand,
    model,
    year,
    useType,
    chassisData: {
      chassisNumber,
      confirmChassisNumber: chassisNumber
    },
    engineData: {
      engineNumber,
      confirmEngineNumber: engineNumber
    },
    isUsedData: {
      gnc,
      domainNumber
    },
    isPymeData: {
      hasFleetInsurance,
      isCommercialVehicle
    }
  };
  return result;
}

export function VehicleDataForm2Vehicle(
  vehicleDataForm: VehicleDataForm
): Partial<Vehicle> {
  const {
    brand,
    model,
    useType,
    chassisData: { chassisNumber },
    engineData: { engineNumber },
    isUsedData: { gnc, domainNumber },
    isPymeData: { hasFleetInsurance, isCommercialVehicle: commercialVehicle }
  } = vehicleDataForm;

  const result: Partial<Vehicle> = {
    brand,
    model,
    useType,
    chassisNumber,
    engineNumber,
    gnc,
    domainNumber,
    commercialVehicle,
    hasFleetInsurance
  };
  return result;
}
