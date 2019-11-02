export interface Scoring {
  ratesProductViewDTOList: [
    {
      indexerType: string;
      matrixCode: string;
      rates: [
        {
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
        }
      ];
    }
  ];
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
}
