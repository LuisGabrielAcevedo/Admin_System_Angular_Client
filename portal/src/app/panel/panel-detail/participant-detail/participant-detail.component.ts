import { Component, OnChanges, Input } from '@angular/core';
import { Customer } from '@app/proposal/api/proposal';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { TranslateService } from '@ngx-translate/core';
import { PARTICIPANTS_TYPE } from '@app/constants/panel.contants';
registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.scss']
})
export class ParticipantDetailComponent implements OnChanges {
  @Input() customer: Customer;
  @Input() participantType: string; // 'O' | 'CO'

  public labelParticipanType = '';

  constructor(private translate: TranslateService) {}

  ngOnChanges() {
    this.labelParticipanType =
      this.participantType &&
      this.participantType.toUpperCase() == PARTICIPANTS_TYPE.OWNER_TYPE
        ? this.translate.instant('@Owner')
        : this.translate.instant('@CoOwner');
  }
}
