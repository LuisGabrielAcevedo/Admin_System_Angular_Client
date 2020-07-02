import { REGEXP } from '@mcy/core/constants';
import { ICurrency } from 'client/app/app/models';
import { IUserDocumentType } from 'client/app/signup/models';

export const BASECSV = 'data:text/csv;charset=utf-8,';
export const BASE64 = 'data:application/pdf;base64,';
export const MOBILE_MAX_WIDTH: number = 960;
export const AUTOCOMPLETE_DEBOUNCE: number = 300;
export const MAX_HOUR = { HOUR: 23, MINUTES: 59 };
export const ITEMS_PER_PAGE: number = 5;
export const NOTIFICATIONS_ITEMS_PER_PAGE: number = 10;
export const DOWNLOADED_FILE_NAME: string = `Comprobante`;
export const ITEMS_PER_LARGE_PAGE: number = 15;
export const URLS = {
	POSITIVE_VALIDATION: 'https://wa.me/1126028000?text=%23codigoempresa'
};
export const ITEMS_PER_SMALL_PAGE: number = 3;
export const ROLES = {
	SUPERADMIN: 'SUPERADMIN',
	ADMIN: 'ADMIN',
	OPERATOR: 'OPERADOR',
	CONSULTANT: 'CONSULTOR'
};
export const SIGNABLE_PAGES = {
	TERMS_AND_CONDITIONS: 'TYC',
	WELCOME: 'BIENVENIDO'
};
export const EXPIRATION_TOKEN_STATUS = '401:401';
export const SAME_ALIAS_ERROR_STATUS = '400:0370';
export const DUPLICATED_ALIAS_ERROR_STATUS = '400:0350';
export const CHECKS_SUCCESS = '000:000';

export const DOCUMENTS: IUserDocumentType[] = [
	{
		code: '3',
		documentType: 'DNI',
		description: 'Documento Único de Identidad (DNI)'
	},
	{
		code: '1',
		documentType: 'LE',
		description: 'Libreta de Enrolamiento'
	},
	{
		code: '5',
		documentType: 'PTE',
		description: 'Pasaporte'
	},
	{
		code: '4',
		documentType: 'CI',
		description: 'Cédula de Identidad'
	},
	{
		code: '2',
		documentType: 'LC',
		description: 'Libreta Cívica'
	}
];
export const CURRENCIES: ICurrency[] = [
	{
		code: '032',
		symbol: 'ARS',
		description: 'pesos'
	},
	{
		code: '840',
		symbol: 'USD',
		description: 'dolares'
	}
];
export const MIN_DATE = new Date(new Date().setMonth(new Date().getMonth() - 3));
export const MAX_DATE = new Date(new Date().setMonth(new Date().getMonth() + 3));
export const MAX_DATE_PLUS = new Date (new Date().setFullYear(new Date().getFullYear() + 1));
export const MIN_DATE_EXTEND = new Date (new Date().setFullYear(new Date().getFullYear() - 100));
export const MAX_DATE_EXTEND =  new Date (new Date().setFullYear(new Date().getFullYear() + 100));
export const STATUS_REQUEST = {
	SUCCESS: 'SUCCESS',
	APPROVED: 'APPROVED',
	AUTHORIZED: 'AUTHORIZED',
	PARTIALLY_AUTHORIZED: 'PARTIALLY_AUTHORIZED',
	PENDING_APPROVAL: 'PENDING_APPROVAL',
	CANCELLED: 'CANCELLED',
	REJECTED: 'REJECTED',
	AUTHORIZED_CONTENT: {
		APPROVED: 'APPROVED',
		DENIED: 'DENIED'
	}
}


export const CONTRAINTS = {
	SOFT_TOKEN: {
		MIN_LENGTH: 6,
	},
	NAME: {
		PATTERN: REGEXP.NAME
	},
	LASTNAME: {
		PATTERN: REGEXP.NAME
	},
	CODE: {
		PATTERN: REGEXP.ALPHANUMERIC
	},
	EMAIL: {
		PATTERN: REGEXP.EMAIL,
	},
	CELLPHONE: {
		MAX_LENGTH: 15,
		PATTERN: REGEXP.NUMERIC
	},
	USERNAME: {
		MIN_LENGTH: 8,
		MAX_LENGTH: 20,
		PATTERN: REGEXP.USERNAME
	},
	PASSWORD: {
		MIN_LENGTH: 8,
		MAX_LENGTH: 10,
	},
	CONTACT: {
		REFERENCE: {
			PATTERN: REGEXP.REFERENCE,
			MAX_LENGTH: 80,
		},
		CBVU: {
			PATTERN: REGEXP.CBVU,
			MAX_LENGTH: 22,
			MIN_LENGTH: 22
		},
		EMAIL: {
			MAX_LENGTH: 45, // TODO: Define value
		},
		ALIAS: {
			MAX_LENGTH: 20,
			MIN_LENGTH: 6,
			PATTERN: REGEXP.ALIAS
		}
	},
	TRANSFER: {
		REFERENCE: {
			MAX_LENGTH: 80,
		},
		PAYMENT_DESCRIPTION: {
			MAX_LENGTH: 80,
			PATTERN: REGEXP.DESCRIPTION
		},
		SEARCHFIELD: {
			MAX_LENGTH: 80
		}
	},

	PAYMENTS: {
		SEARCHFIELD:{
			MAX_LENGTH: 24,
		},
		AMOUNT:{
			MAX_LENGTH: 26,
		},
		DESCRIPTION:{
			MAX_LENGTH: 80
		},
		SALARY :{
			ACCOUNTS :{
				INSTANT:'INSTANT',
				PROGRAMMED :'PROGRAMMED'
			}
		},
		SERVICE: {
			DEBT_ID: {
				MIN_LENGTH: 10,
				MAX_LENGTH: 80
			},
			AMOUNT: {
				MIN_VALUE: 0.01
			}
		}
	},

	REQUESTS: {
		SEARCHFIELD:{
			MAX_LENGTH: 24,
		},
		REJECT: {
			MOVITE: {
				MAX_LENGTH: 50
			}
		}
	},

	ENTERPRISES: {
		HEADER: {
			MAX_DISPLAYED: 3
		}
	},

	DOCUMENTS: {
		PATTERN: REGEXP.ALPHANUMERIC
	}
};

export const AMOUNT_THRESHOLD: number = 40000;
export const SOFT_TOKEN_STATUS = {
	REQUIRED_SUFFIX: '500:100',
	INVALID: 'ARCOT:500:5707',
	UNREGISTERED: 'ARCOT:500:1102',
	INPROCESS: 'ARCOT:500:5800',
	BLOCKED1: 'ARCOT:500:5700',
	BLOCKED2: 'ARCOT:500:5705',
	EXPIRED: 'ARCOT:500:5704',
}

export const MISSING_SIGNATURE = {
	CHECKBOOK: 'BFF-CHB:400:411',
}

export const TRANSFER_STATUS = {
	EMPTY_LIST: 'EXT-TRF:400:UTR0120'
};

export enum LOGIN_ERROR {
	PASSWORD_EXPIRED = 'API-LGN:400:107',
	MULTI_SESSION = 'API-LGN:400:105'
}

export const USER_PERMISSIONS = {
	CONTACTS: {
		WRITE: 'agendaEjecucion',
	},
	PROVIDERS: {
		WRITE: 'pagoProveedoresEjecucion'
	},
	SALARY_PAYMENT: {
		WRITE: 'pagoSueldosEjecucion'
	},
	SERVICE_PAYMENT: {
		WRITE: 'pagoServiciosEjecucion',
	},
	ACCOUNTS: {
		EDIT_ALIAS: 'cuentasEditarAlias'
	},
	TRANSFERS: {
		WRITE: 'transferenciasEjecucion'
	},
	CHECKS: {
		WRITE: 'chequerasEjecucion'
	},
	USER_MANAGEMENT: {
		READ: 'gestionUsuariosConsulta',
		WRITE: 'gestionUsuariosEjecucion',
		ADMIN: 'gestionarAdministradores',
	},
	PROFILE: {
		WRITE: 'datosPersonalesEjecucion',
	},
	SOFT_TOKEN: {
		WRITE: 'softTokenEjecucion'
	},
}

export const RESOURCES = {
	IMAGES: {
		ONBOARDING: [
			'client/assets/images/onbording-carousel/0.png',
			'client/assets/images/onbording-carousel/1.png',
			'client/assets/images/onbording-carousel/2.gif',
			'client/assets/images/onbording-carousel/3.png',
			'client/assets/images/onbording-carousel/4.png',
			'client/assets/images/onbording-carousel/5.png',
			'client/assets/images/onbording-carousel/6.png',
			'client/assets/images/onbording-carousel/7.png'
		]
	}
}

export const MOVEMENTS = {
	MIN_AMOUNT: 0,
	MAX_AMOUNT: 99999999999,
	DAYS_FROM_TODAY: 90
}
