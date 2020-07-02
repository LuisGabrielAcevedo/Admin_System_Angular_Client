/**
 * MAESTRO DE CONTRATOS ENTRE BFF Y FRONT
 */

/*
 headers generales
 -clientVer
 -clientName
 -clientEnv

 header privado (luego del login)
 -enterpriseId
 */

//  Generales

type AccountType = 'CA' | 'CC'; //  V1
type OtherAmountAllowed = 'EQUAL' | 'GREATER_THAN' | 'ANY'; //  V1
type ContactCategory =
	| 'SERVICIO'
	| 'PROVEEDOR'
	| 'CLIENTE'
	| 'EMPLEADO'
	| 'OTRO'; //  V1
type PaymentState = 'APPROVED' | 'DENIED'; //  V1

//  Response general
interface General {
	data: {} | [];
	status: {
		code: string;
		message: string;
		traceId?: string;
	};
}

//  Objetos internos
interface Currency {
	code: string;
	symbol: string;
	description: string;
}

interface Bank {
	id: string;
	name: string;
}

/** LOGIN service */

/**
 * V1
 * login
 * POST sign-in
 */
interface LoginRequest {
	password: string;
	username: string;
}
interface LoginResponse {
	token: string;
	profile: Profile;
}

/** PAGOMISCUENTAS service */

/**
 * V1
 * rubro
 * GET categories
 */
interface Category {
	id: string;
	type: string;
	description: string;
	suggestOrder: number;
}

/**
 * V1
 * GET categories/${categoryId}/services
 *
 * PARAMS:
 * categoryId: "AGUA", "TCIN", etc
 */
interface Service {
	id: string;
	description: string;
	otherAmountAllowed?: OtherAmountAllowed;
	suggestOrder: number;
	paymentType: any; //  TODO REVIEW, validate with Monica/Andreia
	usdPaymentAllowed?: boolean;
	recurrentPaymentAllowed: boolean; //  futuro
	type: string; //  no se sabe bien el valor, es algo interno de PMC
	currency: Currency;
	onlyQuery?: false; //  no se usa en front
}

/**
 * V1
 * GET debts
 *
 * obtiene listado completo de deudas pendientes a pagar (suscriptos)
 * obtiene un service con sus facturas a pagar, para esto enviar banelcoClientId y serviceId (no suscriptos)
 *
 * PARAMS:
 * documentNumber //  TODO REVISAR, se removera luego
 * documentType //  TODO REVISAR, se removera luego
 */
interface ServiceDebts {
	amount: number;
	banelcoClientId: string;
	description: string;
	categoryId?: string;
	invoiceId: string;
	serviceId: string;
	otherAmount: number;
	usdPayment: boolean;
	expirationDate: Date;
	currency: Currency;
}

/**
 * V1
 * GET payments
 * POST payments
 *
 * HEADERS
 * 	softToken
 *
 * PARAMS
 *  documentNumber
 *  documentType
 *
 * Post de pago y suscripcion en simultaneo
 */
interface ServicePayment {
	amount: number;
	description: string;
	banelcoClientId: string;
	invoiceId: string;
	otherAmount: number;
	//  otherAmountCurrency: Currency; //  TODO ver con japo y PMC
	serviceId: string;
	account: {
		number: string;
		type: AccountType;
	};
	currency: Currency;

	//  populate by pmc on backend:
	expirationDate?: Date;
	controlNumber?: string;
	transactionNumber?: string;
	date?: Date;
	state?: PaymentState;
}

/** ACCOUNTS service */

/**
 * V1
 * GET accounts
 *
 * PARAMS:
 * documentNumber //  TODO REVISAR, se removera luego
 */
interface Account {
	alias: string;
	cbvu: string;
	cuilt: string;
	number: string;
	type: AccountType;
	balance?: number;
	uncoverBalance?: number;
	currency: Currency;
	//  detailedBalance: number; futuro, visto con juli, para sprint 7
}

/**
 * V1
 * GET /accounts/${id}/detailed-balances
 */
interface BalanceDetail {
	actualCountableBalance: number;
	debitBlockedValue: boolean;
	dailyMovementAvailable: number;
	creditLimit: number;
	fundsTotalApplication: number;
	availableBalance: number;
	lastUpdateDate: Date;
	numericCreditOfDay: number;
	depositToCompesate: number;
	operatingBalance: number;
	overdraftAgreement: number;
}

/**
 * V1
 * PUT accounts
 * GET responde "Account" sin balance y uncoverBalance
 *
 * Modificacion de alias
 */
interface AliasRequest {
	currentAlias: string;
	newAlias: string;
	cbvu: string;
	cuilt: string;
}

/** PAYMENT-CONTACTS service */

/**
 * V1
 * GET contacts
 * POST contacts
 * PUT /contacts/${id}
 * DELETE  /contacts/${id}
 */
interface Contact {
	id?: string;
	name: string;
	alias: string;
	cbvu: string;
	cuilt: string;
	email: string;
	favorite: boolean;
	activeAccount: boolean;
	accountNumber: string;
	accountType: AccountType;
	reference: string;
	category: ContactCategory;
	lastAmountPaid: [
		{
			amount: number;
			currency: Currency;
		}
	];
	bank: Bank;
}

/** TRANSFERS service */

/**
 * V1
 * GET concepts
 */
interface Concept {
	code: string;
	description: string;
	swornDeclaration: boolean;
}

/**
 * V1
 * POST transfers
 *
 * HEADER:
 * 	softToken
 */
interface NewTransfer {
	amount: number;
	accountType: AccountType; //  para sueldos usar: "CC"
	conceptCode: string; //  para sueldos usar: "HAB"
	destinationHolder: string;
	originCuilt: string;
	originCbvu: string;
	destinationCuilt: string;
	destinationCbvu: string;
	currencyCode: string; //  TODO change to Currency en estabilizacion
	scheduledDate?: Date;
}

/**
 * V1
 * GET transfer
 * POST transfer
 */
interface Transfer {
	id?: string;
	amount: number;
	concept: Concept;
	operationNumber: string;
	controlNumber: string;
	destinationHolder: string;
	originCuilt: string;
	originCbvu: string;
	destinationCuilt: string;
	destinationCbvu: string;
	date: Date;
	currency: Currency;
	state?: string;
	description?: string;
}

/** MOVEMENTS service */

/**
 * V0
 * GET movements/${id}
 */

/**
 * V0
 *
 * PARAMS:
 * 	documentNumber
 * 	documentType
 * 	accountNumber
 */
interface AccountMovement {
	id: string;
	amount: number;
	balance: number;
	accountingDate: Date;
	valueDate: Date;
	description?: string;
	moreDetail: AccountMovementDetail;
	eventCode: string;
	currency: Currency;
}


/**
 * V0
 * GET movements/${id}
 */

/**
 * V0
 *
 * PARAMS:
 * 	documentNumber
 * 	documentType
 * 	accountNumber
 */
interface AccountMovementDetail {
	accountDocumentNumber: string;
	accountDocumentType: string;
	accountNumber: string;
	accountType: AccountType;
	cbvu: string;
	accountingDate: string;
	valueDate: string;
	amount: number;
	currency: Currency;
	referenceNumber: string;
	creditDebitIndicator: string;
	accountBranch?: string;
	accountBranchAddress?: string;
	description?: string;
	cardNumber?: string;
	originAccountHolder?: string,
	originAccountDocumentNumber?: string,
	concept?: Concept;
	price?: number;
	companyName?: string;
}


/** STATEMENTS service */

/**
 * V1
 * GET statements/headers   Lista de extractos para una cuenta
 * GET statements/${id}
 *
 * PARAMS:
 * 	accountNumber
 */
interface Statement {
	id: string;
	date: Date;
}

//  Content type application pdf base64
interface StatementPdf {
	id: string;
	file: string; //  BASE64
}


/** CLIENTS service */

/**
 * V1
 * GET profile
 */
interface Profile {
	notifications: Notification[];
	enterprises: Enterprise[];
	user: User;
}

interface Enterprise {
	id: string;
	cuilt: string;
	name: string;
	shortName: string;
	enterpriseDefault: boolean;
}

//  patch layout/enterprise/:entepriseId
interface EnterprisePatch {
	enterpriseDefault: boolean;
}

interface User {
	id?: string; //  get
	dni: string; //  readonly
	username?: string; //  modificable
	tel?: string;
	email?: string;
	name?: string;
}

/** REQUESTS service */

/**
 * V1
 * GET requests
 */
interface Request {
	id: string;
	type: string; // TRANSFER, SERVICE_PAYMENT. chequera necesitamos los tipos de chequera ej. Chequera de 25 unidades
	detail: string; // En el caso de chequera necesitamos la descripcion del tipo correspondiente.
	amount: number;
	currency: Currency;
	creationDate: Date;
	lastUpdateDate: Date;
	state: string;
	user: User;
	signers: User[];
	rejecter?: User;
	rejectionReason: string;
	scheduledDate?: Date;
	content: Transfer | ServicePayment | Checkbook;
	description: string;
}

/** SIGNSYS service */

/**
 * V1
 * GET sign-capacity?transaction-id:id1&transaction-id:id2&....
 */
interface SignCapacity {
	id: string,
	signAllowed: boolean
}

/** Checkbook service */

/**
 * V1
 * GET
 */
 interface Checkbook {
	account: {
		number: string;
		type: AccountType;
	};
	count: number, // Cantidad
	provinceId: string, //  lo sacamos nosotros de la lista de provincias y sucursales
	branchId: string,
	state: string //  Estado del core del banco, APPROVED, DENIED,
	date: Date
 }

 interface Province {
	 id: string,
	 description: string,
	 branches?: Branch[] // solo vendria cuando obtenemos los tipos de chequera del endpoint
 }

 interface Branch {
	 id: string,
	 description: string
 }

/**
 * V1
 * POST
 */
 interface NewCheckbook {
	account: {
		number: string;
		type: AccountType;
	};
	type: string, // enum de tipos de chequera
	count: number, // Cantidad
	provinceId: string, //  lo sacamos nosotros de la lista de provincias y sucursales
	branchId: string
 }

/**
 * V1
 * POST
 */
 // Habilitar una chequera, queda pendiente revisar del lado de BE si necesitan el id de solicitud y de donde saldria.
 interface EnablementCheckbook {
	account: {
		number: string;
		type: AccountType;
	};
	 initialNumber: string,
	 lastNumber: string
 }

/**
 * V1
 * GET
 */
 // Obtencion de tipos
 interface TypesOfCheckbook {
	 checkbookTypes: CheckbookTypeInfo[],
	 provinces: Province[]
 }

 interface CheckbookTypeInfo {
	type: string, // enum de tipos de chequera
	description: string;
}

interface ICheck {
	number: string;
	code: string; // CMC7
	rejectionReason: string;
	accreditationDate: Date;
	amount: number;
	currency: Currency;
}

/**
 * V1
 * GET
 */
 // Cheques emitidos
 interface CheckIssued extends ICheck{
	state: 'PAID'| 'TO_COVER' | 'REJECTED',
}

/**
 * V1
 * GET
 */
 // Cheques recibidos
interface CheckReceived extends ICheck{
	state: 'ACCREDITED' | 'PENDING_ACCREDITATION' | 'DISCOUNTED' | 'REJECTED',
}

/**
 * V1
 * GET
 */
 // Cheques descontados
interface CheckDiscounted {
	number: string;
	debitAccount: {
		number: string;
		type: AccountType;
	}
	deadline : string;
	finishDate: Date;
	tna: number;
	cftea: string;
	accreditationDate: Date;
	amount: number;
	currency: Currency;
}
