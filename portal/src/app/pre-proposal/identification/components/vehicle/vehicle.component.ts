import { FuelYear } from '@app/pre-proposal/api/fuelYear';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UserSellingPoint } from '@app/common/login/models/state/selling-point';
import {
  SIMULATION_TYPE,
  VEHICLE_TYPE
} from '@app/constants/vehicle.constants';
import { Brand } from '@app/pre-proposal/api/brand';
import { Model } from '@app/pre-proposal/api/model';
import { VehicleType } from '@app/pre-proposal/api/vehicleType';
import { Year } from '@app/pre-proposal/api/year';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Coupon } from '@app/pre-proposal/api/couponResponse';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  /* Form groups */
  @Input() form: FormGroup;
  @Input() vehicleData: FormGroup;
  /* Lists */
  @Input() brands: Array<Brand>;
  @Input() models: Array<Model>;
  @Input() years: Array<Year>;
  @Input() coupons: Array<Coupon>;
  public validVehicleTypes: Array<VehicleType> = [];
  /* Control */
  @Input() formSubmitAttempt: boolean;
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(public translate: TranslateService) {}

  ngOnInit() {
    this.setSimulationTypeValidators(
      this.vehicleData.get('simulationType').value
    );
    this.disableFieldsByDefault();

    const checkCurrentVehicleTypeObservable: Observable<any> = merge(
      this.form
        .get('sellingPoint')
        .valueChanges.pipe(filter(sellingPoint => sellingPoint)),
      this.form.get('vehicleTypes').valueChanges,
      this.form.get('worksInDependencyRelationship').valueChanges
    );

    checkCurrentVehicleTypeObservable
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.validVehicleTypes = this.getValidVehiclesTypes();
        this.checkCurrentVehicleType();
      });
  }

  disableFieldsByDefault(): void {
    this.vehicleData.get('model').disable();
    this.vehicleData.get('year').disable();
  }

  getValidVehiclesTypes(): VehicleType[] {
    const sellingPoint: UserSellingPoint = this.form.get('sellingPoint').value;
    const vehicleTypes: VehicleType[] = this.form.get('vehicleTypes').value;
    return vehicleTypes.filter(
      type =>
        (type.code === VEHICLE_TYPE.CAR.CODE &&
          sellingPoint.features.carEnabled) ||
        (type.code === VEHICLE_TYPE.UTILITARY.CODE &&
          sellingPoint.features.utilitarianEnabled)
    );
  }

  checkCurrentVehicleType(): void {
    const vTypeControl = this.vehicleData.get('type');
    const current: VehicleType = vTypeControl.value;
    if (this.vehicleTypeIsValid(current)) return;
    const valid = this.validVehicleTypes.find(type =>
      this.vehicleTypeIsValid(type)
    );
    if (valid) {
      vTypeControl.patchValue(valid);
      return;
    }
    vTypeControl.patchValue(null);
  }

  vehicleTypeIsValid(vType: VehicleType): boolean {
    const isDepRel = this.form.get('worksInDependencyRelationship');
    if (!vType) return false;
    if (!this.validVehicleTypes.find(type => type.code === vType.code)) {
      return false;
    }
    if (vType.code === VEHICLE_TYPE.UTILITARY.CODE && isDepRel.value) {
      return false;
    }
    return true;
  }

  simulationTypeChangeHandler(): void {
    const simType: string = this.vehicleData.get('simulationType').value;
    if (simType === SIMULATION_TYPE.BRAND_MODEL) {
      this.resetBrandAndModel();
    }
    if (simType === SIMULATION_TYPE.ESTIMATED_VALUE) {
      this.resetEstimatedValue();
    }
  }

  brandChangeHandler(): void {
    const brand: Brand = this.vehicleData.get('brand').value;
    brand ? this.resetModels(true) : this.resetModels(false);
  }

  modelChangeHandler(): void {
    const model: Model = this.vehicleData.get('model').value;
    model ? this.resetYears(true) : this.resetYears(false);
  }

  yearChangeHandler(): void {
    const simType: string = this.vehicleData.get('simulationType').value;
    const specs: FuelYear = this.vehicleData.get('year').value;
    if (specs && simType === SIMULATION_TYPE.BRAND_MODEL) {
      this.vehicleData.get('price').patchValue(specs.price);
    }
  }

  resetModels(enable: boolean = true) {
    const model = this.vehicleData.get('model');
    model.reset();
    enable ? model.enable() : model.disable();
  }

  resetYears(enable: boolean = true) {
    const year = this.vehicleData.get('year');
    year.reset();
    enable ? year.enable() : year.disable();
  }

  resetEstimatedValue() {
    this.vehicleData.get('brand').reset(null);
    this.vehicleData.get('model').reset(null);
    this.vehicleData.get('price').reset();
    this.vehicleData.get('year').reset();
    this.vehicleData.get('year').enable();
  }

  resetBrandAndModel() {
    this.vehicleData.get('price').reset('');
    this.vehicleData.get('brand').reset();
    this.vehicleData.get('model').reset();
    this.vehicleData.get('model').disable();
    this.vehicleData.get('year').reset();
    this.vehicleData.get('year').disable();
    this.models = [];
    this.years = [];
  }

  setSimulationTypeValidators(simulationType: string): void {
    const brandControl = this.vehicleData.get('brand');
    const modelControl = this.vehicleData.get('model');
    if (simulationType === SIMULATION_TYPE.ESTIMATED_VALUE) {
      brandControl.setValidators(null);
      modelControl.setValidators(null);
    } else if (simulationType === SIMULATION_TYPE.BRAND_MODEL) {
      brandControl.setValidators([Validators.required]);
      modelControl.setValidators([Validators.required]);
    }
    brandControl.updateValueAndValidity();
    modelControl.updateValueAndValidity();
  }

  resetForm(): void {
    this.vehicleData.reset();
    this.vehicleData.patchValue({
      type: null,
      simulationType: SIMULATION_TYPE.BRAND_MODEL,
      brand: null,
      model: null,
      year: null,
      price: ''
    });
    this.vehicleData.enable();
    this.validVehicleTypes = this.getValidVehiclesTypes();
    setTimeout(() => {
      this.checkCurrentVehicleType();
    }, 0);
    this.disableFieldsByDefault();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
