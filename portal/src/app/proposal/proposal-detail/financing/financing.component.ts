import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Scoring } from '@app/proposal/api/proposal';
import { CalculatedValueDTO } from './../../api/proposal';
registerLocaleData(localeEsAr, 'es-AR');
@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss']
})
export class FinancingComponent implements OnInit, OnChanges {
  @Input() scoring: Scoring;

  public percentageRate: number;
  public calcValue: CalculatedValueDTO;
  public indexerType: string;

  public noData = '-';

  constructor() {}

  ngOnChanges() {
    if (!this.scoring) return;

    this.calcValue = this.scoring.calculatedValueDTO;

    this.percentageRate =
      this.scoring && this.scoring.ratesProductViewDTOList
        ? this.scoring.ratesProductViewDTOList[0].rates[0].percentageRate
        : 0;

    this.indexerType = this.scoring.ratesProductViewDTOList[0].indexerType;
  }

  ngOnInit() {}
}
