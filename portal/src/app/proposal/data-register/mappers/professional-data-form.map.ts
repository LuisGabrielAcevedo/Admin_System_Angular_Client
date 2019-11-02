import { ProposalDTO, Customer } from '@app/proposal/api';
import { ProfessionalDataForm } from '../models/professional-data-form.model';
import { getDateFromISO } from '@app/shared/util/functions/iso-date.function';

export function GetProposalRes2ProfessionalDataForm(
  getProposalRes: ProposalDTO,
  customerType: 'owner' | 'coOwner'
): ProfessionalDataForm {
  let result: ProfessionalDataForm;
  const customer = getProposalRes[customerType];
  if (customer && getProposalRes) {
    result = { ...Customer2ProfessionalDataForm(customer) };
    return result;
  }
}

/**
 * Maps the values of a Professional Data Form to Patch Customer
 * @param personalDataForm The object from the personal data form
 */
export function ProfessionalDataForm2PatchCustomer(
  professionalDataForm: ProfessionalDataForm
): Partial<Customer> {
  let result: Partial<Customer>;
  if (professionalDataForm) {
    result = {
      ...ProfessionalDataForm2Customer(professionalDataForm)
    };
    return result;
  }
}

export function Customer2ProfessionalDataForm(
  customer: Customer
): ProfessionalDataForm {
  const {
    occupation,
    role,
    profession,
    educationLevel,
    enterpriseType,
    economicSector,
    afipActivity,
    afipActivityInitDate
  } = customer;

  const parsedAfipDate = getDateFromISO(afipActivityInitDate);

  const monthWithoutZero = parsedAfipDate
    ? Number(parsedAfipDate.slice(2, 4))
    : null;

  const result: ProfessionalDataForm = {
    occupation,
    role,
    profession,
    educationLevel,
    enterpriseType,
    economicSector,
    afipActivity,
    afipMonth: monthWithoutZero ? monthWithoutZero.toString() : null,
    afipYear: parsedAfipDate ? parsedAfipDate.slice(4, 8) : null
  };
  return result;
}

export function ProfessionalDataForm2Customer(
  professionalDataForm: ProfessionalDataForm
): Partial<Customer> {
  const {
    occupation,
    role,
    profession,
    educationLevel,
    enterpriseType,
    economicSector,
    afipActivity,
    afipMonth,
    afipYear
  } = professionalDataForm;

  const date =
    afipMonth && afipYear
      ? Number(afipMonth) < 10
        ? `010${afipMonth}${afipYear}`
        : `01${afipMonth}${afipYear}`
      : null;

  const result: Partial<Customer> = {
    occupation,
    role,
    profession,
    educationLevel,
    enterpriseType,
    economicSector,
    afipActivity,
    afipActivityInitDate: date
  };
  return result;
}
