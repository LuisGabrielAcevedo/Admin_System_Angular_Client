import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Vehicle } from '@app/proposal/api/proposal';
import { Insurance } from '@app/proposal/api/proposal';
import { Scoring } from '@app/proposal/api/proposal';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { TranslateService } from '@ngx-translate/core';
import { VEHICLE_TYPE } from '@app/constants/vehicle.constants';

registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnChanges {
  @Input() vehicle: Vehicle;
  @Input() insurance: Insurance;
  @Input() finance: Scoring;

  public labelGNC = '';
  public labelTransportation = '';
  public labelFleetInsurance = '';
  public labelState = '';
  public estimatedValue: number = null;

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.labelGNC =
      this.vehicle.gnc === VEHICLE_TYPE.CAR.CODE
        ? this.translate.instant('@Yes')
        : this.translate.instant('@Not');

    this.labelTransportation = this.vehicle.commercialVehicle
      ? this.translate.instant('@Yes')
      : this.translate.instant('@Not');

    this.labelFleetInsurance = this.vehicle.hasFleetInsurance
      ? this.translate.instant('@Yes')
      : this.translate.instant('@Not');

    this.labelState = this.vehicle.fuelYear.zeroKm
      ? this.translate.instant('@0Km')
      : this.translate.instant('@USed');

    if (
      this.finance &&
      this.finance.calculatedValueDTO &&
      this.finance.calculatedValueDTO.initialPayment &&
      this.finance.calculatedValueDTO.financedAmount
    ) {
      this.estimatedValue =
        this.finance.calculatedValueDTO.initialPayment +
        this.finance.calculatedValueDTO.financedAmount;
    }
  }
}
