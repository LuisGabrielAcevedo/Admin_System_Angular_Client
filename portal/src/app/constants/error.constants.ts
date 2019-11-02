import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';

export const DUPLICATE_DNI_ERRORS: FormFieldErrorMap = {
  ownerAndCoOwnerDuplicate: {
    msg: 'El DNI del Titular y Cotitular no pueden ser iguales',
    priority: 2
  },
  ownerAndOwnerSpouseDuplicate: {
    msg: 'El DNI del Titular y su cónyuge no pueden ser iguales',
    priority: 1
  },
  coOwnerAndOwnerSpouseDuplicate: {
    msg: 'El DNI del cónyuge del Titular no puede ser igual al del Cotitular',
    priority: 2
  },
  ownerSpouseAndCoOwnerSpouseDuplicate: {
    msg:
      'El DNI del cónyuge del Titular no puede ser igual al del cónyuge del Cotitular',
    priority: 3
  },
  coOwnerAndCoOwnerSpouseDuplicate: {
    msg: 'El DNI del Cotitular y su cónyuge no pueden ser iguales',
    priority: 1
  },
  ownerAndCoOwnerSpouseDuplicate: {
    msg: 'El DNI del cónyuge del Cotitular no puede ser igual al del Titular',
    priority: 2
  },
  coOwnerSpouseAndOwnerSpouseDuplicate: {
    msg:
      'El DNI del cónyuge del Cotitular no puede ser igual al del cónyuge del Titular',
    priority: 3
  }
};

export const DNI_TYPE_ERROR: FormFieldErrorMap = {
  invalidDocumentType: {
    msg: 'Por favor, ajuste el Tipo de Documento',
    priority: 1
  }
};

export const BIRTHDATE_ERRORS: FormFieldErrorMap = {
  invalidDate: { msg: 'Fecha inválida', priority: 3 },
  under18: { msg: 'Debe ser mayor a 18 años', priority: 2 },
  under21: {
    msg: 'Debe ser mayor de 21 años para seleccionar este tipo de vehículo',
    priority: 1
  }
};

export const PERSON_ERRORS: FormFieldErrorMap = {
  notFoundCuitl: {
    msg: 'Por favor, verificar el Número de Documento ingresado',
    priority: 1
  }
};

export const INVALID_AFIP_DATE_ERRORS: FormFieldErrorMap = {
  invalidAfipDate: {
    msg: 'Fecha inválida',
    priority: 1
  }
};

export const EXPIRED_TOKEN_MESSAGE =
  'Identification token not found; Did it expire?';

export const NO_INSURANCE_DETAILS_MESSAGE =
  'Can not found insurance details for this insurance plan';

export const NO_APPOINTMENT_MESSAGE =
  'Appointment no encontrado con proposalNumber';
