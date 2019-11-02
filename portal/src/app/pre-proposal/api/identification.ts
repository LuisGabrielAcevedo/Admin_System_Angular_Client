export interface Identification {
  customer: {
    afipActivity: {
      description: string;
      id: number;
      integrationCode: string;
    };
    afipActivityAntiquity: number;
    birthDate: string;
    cuitl: string;
    document: string;
    documentType: {
      description: string;
      id: number;
      integrationCode: string;
    };
    firstName: string;
    gender: {
      description: string;
      id: number;
      integrationCode: string;
    };
    income: number;
    lastName: string;
    married: boolean;
    owner: boolean;
    phone: string;
  };
  parties: [
    {
      afipActivity: {
        description: string;
        id: number;
        integrationCode: string;
      };
      afipActivityAntiquity: number;
      birthDate: string;
      cuitl: string;
      document: string;
      documentType: {
        description: string;
        id: number;
        integrationCode: string;
      };
      firstName: string;
      gender: {
        description: string;
        id: number;
        integrationCode: string;
      };
      income: number;
      lastName: string;
      married: boolean;
      owner: boolean;
      phone: string;
    }
  ];
  scoring: {
    ratesProductViewDTOList: {
      indexerType: string;
      matrixCode: string;
      rates: {
        axisCode: string;
        axisEnd: number;
        axisStart: number;
        axisTypeCode: string;
        creationDate: string;
        descriptionAxis: string;
        installments: [];
        longDescriptionMatrix: string;
        matrixCode: string;
        modificationDate: string;
        percentageRate: number;
        rateId: number;
        shortDescriptionMatrix: string;
        status: boolean;
        validityEndDate: string;
        validityStartDate: string;
      }[];
    }[];
    riskEvaluation: {
      output: string;
      riskEvaluationResultDTO: {
        enableImprovement: string;
        finalAlternativeAmount: number;
        finalAlternativeAmountUVA: number;
        finalAmount: number;
        finalAmountUVA: number;
        finalInstallment: number;
        finalInstallmentUVA: number;
        finalInstallmentValue: number;
        finalInstallmentValueUVA: number;
        ltv: number;
        ltvUVA: number;
        maxVehicleAmount: number;
        maxVehicleAmountUVA: number;
        minAmount: number;
        minAmountUVA: number;
        minInstallment: number;
        minInstallmentUVA: number;
        reasons: [
          {
            description: string;
            group: string;
            reason: string;
          }
        ];
        repairable: string;
        statusCode: string;
      };
      solicitudeNumber: number;
      success: boolean;
    };
  };
  store: {
    id: number;
    integrationCode: string;
    name: string;
    sellingPointCode: number;
  };
  uuid: string;
  vehicle?: {
    adapted: boolean;
    brand?: {
      description: string;
      id: number;
      inactive: boolean;
      integrationCode: string;
      organizationId: number;
    };
    fuelYear?: {
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
    model?: {
      description: string;
      id: number;
      inativo: boolean;
      integrationCode: string;
      organizationId: number;
    };
    purchaseValue: number;
    taxi?: boolean;
    used?: boolean;
    vehicleType?: {
      description: string;
      filter: string;
      id: number;
      inativo: boolean;
      organizationId: number;
    };
  };
}
