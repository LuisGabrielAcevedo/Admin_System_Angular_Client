import { Component, Input, OnChanges } from '@angular/core';
import { Scoring } from '@app/proposal/api/proposal';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { INDEXER_TYPE } from '@app/constants/panel.contants';
registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-finance-detail',
  templateUrl: './finance-detail.component.html',
  styleUrls: ['./finance-detail.component.scss']
})
export class FinanceDetailComponent implements OnChanges {
  @Input() finance: Scoring;
  public indexerType: string;
  public percentageRate: number;
  public finalAmount: number;

  public UVA = INDEXER_TYPE.UVA;

  ngOnChanges() {
    if (this.finance) {
      this.indexerType = this.finance.ratesProductViewDTOList
        ? this.finance.ratesProductViewDTOList[0].indexerType
        : '';

      this.percentageRate = this.finance.ratesProductViewDTOList
        ? this.finance.ratesProductViewDTOList[0].rates[0].percentageRate
        : 0;

      this.finalAmount =
        this.finance.ratesProductViewDTOList[0] &&
        this.finance.ratesProductViewDTOList[0].indexerType === INDEXER_TYPE.UVA
          ? this.finance.riskEvaluation.riskEvaluationResultDTO.finalAmountUVA
          : this.finance.riskEvaluation.riskEvaluationResultDTO.finalAmount;
    }
  }
}
