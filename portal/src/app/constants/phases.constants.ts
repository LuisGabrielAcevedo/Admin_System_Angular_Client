export const PHASES_NORMALIZED = {
  R: {
    PHASES_CODE: 'R',
    NAME: '@Data Register', // 1 REGISTRO DE DATOS
    URL: 'proposal/data-register/owner/',
    ID_FASE: 1001,
    ID_ST_PROPOSTA: 11
  },
  U: {
    PHASES_CODE: 'U',
    NAME: '@Proposal In Analysis Customer', // 2 PROPUESTA EN ANALISIS CUSTOMER
    ID_FASE: 1002,
    ID_ST_PROPOSTA: 12
  },
  G: {
    PHASES_CODE: 'G',
    NAME: '@Proposal in Analysis Client', // 3 PROPUESTA EN ANALISIS CLIENTE (NEW VIEW)
    URL: 'proposal/manageable-rejection/',
    ID_FASE: 1003,
    ID_ST_PROPOSTA: 13
  },
  E: {
    PHASES_CODE: 'E',
    NAME: '@Proposal in Analysis Risk', // 4 PROPUESTA EN ANALISIS RIESGOS
    ID_FASE: 1004,
    ID_ST_PROPOSTA: 14
  },
  O: {
    PHASES_CODE: 'O',
    NAME: '@Insurances Quotation', // 5 COTIZACION DE SEGUROS
    URL: 'proposal/insurance/',
    ID_FASE: 1005,
    ID_ST_PROPOSTA: 15
  },
  M: {
    PHASES_CODE: 'M',
    NAME: '@Manual Insurances Quotation', // 6 COTIZACION MANUAL DE SEGUROS
    ID_FASE: 1006,
    ID_ST_PROPOSTA: 16
  },
  F: {
    PHASES_CODE: 'F',
    NAME: '@Application Entry', // 7 INGRESO DE SOLICITUD
    URL: 'proposal/formalization/',
    ID_FASE: 1007,
    ID_ST_PROPOSTA: 17
  },
  A: {
    PHASES_CODE: 'A',
    NAME: '@Documental Analysis', // 8 ANALISIS DOCUMENTAL
    ID_FASE: 1009,
    ID_ST_PROPOSTA: 18
  },
  P: {
    PHASES_CODE: 'P',
    NAME: '@Liquidation Process', // 9 EN PROCESO DE LIQUIDACION
    ID_FASE: 1028,
    ID_ST_PROPOSTA: 19
  },
  S: {
    PHASES_CODE: 'S',
    NAME: '@Appointment Pending', // 10 SELECCION DE FECHA DE CITA (NEW VIEW)
    URL: 'proposal/appointment/date/'
  },
  I: {
    PHASES_CODE: 'I',
    NAME: '@Pledge Pending', // 11 REGISTRO DE PRENDA INSCRIPTA (NEW VIEW)
    URL: 'proposal/pledge/'
  },
  H: {
    PHASES_CODE: 'H',
    NAME: '@Pledge in Analysis', // 12 PRENDA EN ANALISIS
    ID_FASE: 1021,
    ID_ST_PROPOSTA: 24
  },
  D: {
    PHASES_CODE: 'D',
    NAME: '@Physical Documents Pending', // 13 PENDIENTE DOCUMENTOS FISICOS
    ID_FASE: 1027,
    ID_ST_PROPOSTA: 25
  },
  B: {
    PHASES_CODE: 'B',
    NAME: '@Appointment Done Confirmation', // 14 CONFIRMACION CITA REALIZADA (NEW VIEW)
    URL: 'proposal/appointment/confirmation/'
  },
  Q: {
    PHASES_CODE: 'Q',
    NAME: '@Liquidation Pending', // 15 PENDIENTE DE LIQUIDACION
    ID_FASE: 1018,
    ID_ST_PROPOSTA: 22
  },
  L: {
    PHASES_CODE: 'L',
    NAME: '@Liquidated Pledge Pending', // 16 LIQUIDADO PENDIENTE DE PRENDA (NEW VIEW)
    URL: 'proposal/pledge/',
    ID_FASE: 1019,
    ID_ST_PROPOSTA: 23
  },
  C: {
    PHASES_CODE: 'C',
    NAME: '@Pledge' // 17 PRENDA
  },
  T: {
    PHASES_CODE: 'T',
    NAME: '@Cancelled' // 18 CANCELADA
  }
};

export const PHASES_PROCESS_STATUS = {
  ONGOING: 'ONGOING', //desabilitado
  NOT_RUNNING: 'NOT_RUNNING', //habilitado
  LAST_PROCESS_ERROR: 'LAST_PROCESS_ERROR' // desabilitado
};
