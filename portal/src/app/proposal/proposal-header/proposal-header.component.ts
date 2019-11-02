import { getDateFromISO } from './../../shared/util/functions/iso-date.function';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProposalHeaderData } from './proposal-header-data.model';

@Component({
  selector: 'app-proposal-header',
  templateUrl: './proposal-header.component.html'
})
export class ProposalHeaderComponent implements OnChanges {
  @Input() headerData: ProposalHeaderData;
  public labelValue = '';
  public noData: string = '-';
  public initialPayment: number;
  public parsedBirthDate: string;

  constructor(private translate: TranslateService) {}

  ngOnChanges() {
    if (this.headerData) {
      this.labelValue =
        this.headerData.vehicle.model && this.headerData.vehicle.model.id
          ? this.translate.instant('@Vehicle Value')
          : this.translate.instant('@Estimated  Value');
      if (
        this.headerData.vehicle &&
        this.headerData.scoring &&
        this.headerData.scoring.calculatedValueDTO
      ) {
        const p = this.headerData.vehicle.purchaseValue;
        const f = this.headerData.scoring.calculatedValueDTO.financedAmount;
        this.initialPayment = p - f;
      }
      if (this.headerData.owner) {
        this.parsedBirthDate = getDateFromISO(this.headerData.owner.birthDate);
      }
    }
  }
}
