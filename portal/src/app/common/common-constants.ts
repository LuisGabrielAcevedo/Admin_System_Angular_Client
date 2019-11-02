import * as moment from 'moment';

export class CommonConstants {
  public static CUIT = 152;
  public static CUIL = 153;
  public static CASADO = '3';
  public static SOLTERO = '1';
  public static AGE_LIMIT = 18;
  public static STATUS_OK = 'OK';
  public static PERSONAL_DATA = 'P';
  public static WORK_DATA = 'L';
  public static ARGENTINA_OBJECT_NAME = 'ARGENTINA';
  public static NAME_REGEX =
    "^(([A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+|([A-Za-zÁÉÍÓÚñáéíóúÑ\\']+)[ ]{1}?([A-Za-zÁÉÍÓÚñáéíóúÑ\\']+))+$";
  public static STREET_REGEX =
    "(([0-9A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+|([0-9A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[ ]{1}?)){1,2}([0-9A-Za-zÁÉÍÓÚñáéíóúÑ\\']+){1}$";
  public static NUMBERS_REGEX = '^[0-9]+$';
  public static ALPHANUMERIC_REGEX = '^([a-zñA-ZÑ0-9]+)$';
  public static EMAIL_REGEX =
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,3}$';
  public static AGE_LIMIT_VEHICLE = 21;
  public static VALID = 'VALID';
  public static INVALID = 'INVALID';
  public static ESTIMATED_VALUE = 'VE';
  public static MODEL_BRAND = 'MM';
  public static CAR = 'A';
  public static UTILITARY = 'U';
  public static TRUCK = 'C';
  public static AFIP_CODE_RELACION_DE_DEPENDENCIA = 11;
  public static DNI_EXTRANJERO = 151;
  public static DNI_ARGENTINO = 150;
  public static VALID_DNI_REGEX = '^[0-9]{7,8}$';
  public static CHASSIS_CHAR_REGEX = /([A-HJ-NPR-Z0-9]){1}/;
  public static ENGINE_CHAR_REGEX = /([A-Z0-9]){1}/;
  public static MANUALQUOTATION = 'MQ';
  public static APPROVED = 'AP';
  public static HOLD = 'HO';
  public static INVALID_SALARY_CHARS_REGEX = /['¿¡´°\\¨¬ñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙýÝ]/g;
  public static MINIMUM_VALID_MONEY_VALUE = 1;
  public static IVA_CAT = 'IV';
  public static IIBB_CAT = 'IB';
  public static MINIMUM_AFIP_AGE_1950 = moment('1950-01-01');
  public static INVALID_ALPHABETIC_CHARS_REGEX = /[^A-ZÑ ]+/gi;
  public static INVALID_ALPHANUMERIC_CHARS_REGEX = /[^A-ZÑ0-9 ]+/gi;
  public static INVALID_CHASSIS_CHARS_REGEX = /[^A-HJ-NPR-Z0-9]+/gi;
  public static INVALID_NUMERIC_CHARS_REGEX = /[^0-9]+/g;
  public static INVALID_EMAIL_CHARS_REGEX = /[^A-ZÑ0-9@.]+/gi;
}

export const CAR = 'A';
export const UTILITARY = 'U';
export const TRUCK = 'C';
export const CUIT_ID = 152;
export const CUIL_ID = 153;
export const ARGENTINE_DNI_ID = 150;
export const FOREIGN_DNI_ID = 151;
export const CASADO_ID = '3';
export const SOLTERO_ID = '1';
export const PERSONAL_DATA_ID = 'P';
export const WORK_DATA_ID = 'L';
export const ESTIMATED_VALUE_ID = 'VE';
export const MODEL_BRAND_ID = 'MM';
export const IVA_CAT_ID = 'IV';
export const IIBB_CAT_ID = 'IB';
export const MOMENT_1950 = moment('1950-01-01');
export const EMPTY_SPACES = /\S/;
export const ON_BOARDING_APPROVED = 'APR';
export const ON_BOARDING_PENDING = 'PEN';
export const ON_BOARDING_REJECTED = 'REC';
export const ON_BOARDING_SUBMITTED = 'SUB';
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;
export const LAST_NAME_MAX_LENGTH = 20;

export const VEHICLE_TYPE_ORDER = {
  [CAR]: 1,
  [UTILITARY]: 2,
  [TRUCK]: 3
};
