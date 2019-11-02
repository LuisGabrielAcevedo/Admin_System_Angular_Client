import { CustomerPatch, VehiclePatch } from './proposal.patch';

export interface ProposalDTO {
  proposalNumber: number;
  financedAmount: number;
  terms: number;
  installmentValue: number;
  productCode: string;
  owner: CustomerPatch;
  coOwner: CustomerPatch;
  vehicle: VehiclePatch;
  store: {
    id: number;
    name: string;
    integrationCode: number;
  };
  scoring: {
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
            installments: number[];
            longDescriptionMatrix: string;
            matrixCode: string;
            modificationDate: string;
            percentageRate: number;
            rateId: number;
            rateType: string;
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
  };
  commentsList: CommentsList[];
}

export interface CommentsList {
  type: string;
  message: string;
  user: string;
  date: string;
}
