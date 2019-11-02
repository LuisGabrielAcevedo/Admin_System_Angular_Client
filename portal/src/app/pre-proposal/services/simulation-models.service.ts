import { Injectable } from '@angular/core';
import { Identification } from '../api/identification';
import { Indexer } from '../api/indexer';
import { InstallmentValue } from '../api/installmentValue';

@Injectable({
  providedIn: 'root'
})
export class SimulationModelsService {
  constructor() {}

  public identificationModel(): Identification {
    return {
      customer: {
        afipActivity: {
          description: '',
          id: 0,
          integrationCode: ''
        },
        afipActivityAntiquity: 0,
        birthDate: '',
        cuitl: '',
        document: '',
        documentType: {
          description: '',
          id: 0,
          integrationCode: ''
        },
        firstName: '',
        gender: {
          description: '',
          id: 0,
          integrationCode: ''
        },
        income: 343,
        lastName: '',
        married: true,
        owner: true,
        phone: ''
      },
      parties: [
        {
          afipActivity: {
            description: '',
            id: 0,
            integrationCode: ''
          },
          afipActivityAntiquity: 0,
          birthDate: '',
          cuitl: '',
          document: '',
          documentType: {
            description: '',
            id: 0,
            integrationCode: ''
          },
          firstName: '',
          gender: {
            description: '',
            id: 0,
            integrationCode: ''
          },
          income: 32,
          lastName: '',
          married: true,
          owner: true,
          phone: ''
        }
      ],
      scoring: {
        ratesProductViewDTOList: [
          {
            indexerType: '',
            matrixCode: '',
            rates: [
              {
                axisCode: '',
                axisEnd: 0,
                axisStart: 0,
                axisTypeCode: '',
                creationDate: '',
                descriptionAxis: '',
                installments: [],
                longDescriptionMatrix: '',
                matrixCode: '',
                modificationDate: '',
                percentageRate: 33,
                rateId: 0,
                shortDescriptionMatrix: '',
                status: true,
                validityEndDate: '',
                validityStartDate: ''
              }
            ]
          }
        ],
        riskEvaluation: {
          output: '',
          riskEvaluationResultDTO: {
            enableImprovement: '',
            finalAlternativeAmount: 0,
            finalAlternativeAmountUVA: 0,
            finalAmount: 0,
            finalAmountUVA: 0,
            finalInstallment: 0,
            finalInstallmentUVA: 0,
            finalInstallmentValue: 0,
            finalInstallmentValueUVA: 0,
            ltv: 0,
            ltvUVA: 0,
            maxVehicleAmount: 0,
            maxVehicleAmountUVA: 0,
            minAmount: 0,
            minAmountUVA: 0,
            minInstallment: 0,
            minInstallmentUVA: 0,
            reasons: [
              {
                description: '',
                group: '',
                reason: ''
              }
            ],
            repairable: '',
            statusCode: ''
          },
          solicitudeNumber: 0,
          success: true
        }
      },
      store: {
        id: 0,
        integrationCode: '',
        name: '',
        sellingPointCode: 0
      },
      uuid: '',
      vehicle: {
        adapted: true,
        brand: {
          description: '',
          id: 0,
          inactive: true,
          integrationCode: '',
          organizationId: 0
        },
        fuelYear: {
          description: '',
          fuelType: '',
          id: 0,
          inactive: true,
          integrationCode: '',
          organizationId: 0,
          origin: '',
          year: 0,
          zeroKm: true
        },
        model: {
          description: '',
          id: 0,
          inativo: true,
          integrationCode: '',
          organizationId: 0
        },
        purchaseValue: 0,
        taxi: true,
        used: true,
        vehicleType: {
          description: '',
          filter: '',
          id: 0,
          inativo: true,
          organizationId: 0
        }
      }
    };
  }

  public indexerModel(): Indexer {
    return {
      id: 0,
      indexerValue: 0,
      indexerCode: '',
      indexerDesc: '',
      indexerType: ''
    };
  }

  public installmentValuesModel(): InstallmentValue {
    return {
      tea: 0,
      pureEstimatedInstallmentValue: 0,
      pureEstimatedInstallmentValueWithIva: 0,
      pureEstimatedInstallmentValueInUVA: 0,
      capitalInUVAs: 0,
      cftea: 0,
      tna: 0
    };
  }
}
