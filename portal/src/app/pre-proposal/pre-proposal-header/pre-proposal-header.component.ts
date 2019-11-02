import { Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pre-proposal-header',
  templateUrl: './pre-proposal-header.component.html'
})
export class PreProposalHeaderComponent implements OnChanges {
  @Input() headerData;
  public labelValue = '';

  constructor(private translate: TranslateService) {}

  ngOnChanges() {
    this.labelValue =
      this.headerData.vehicle.model && this.headerData.vehicle.model.id
        ? this.translate.instant('@Vehicle Value')
        : this.translate.instant('@Estimated  Value');
  }
}
