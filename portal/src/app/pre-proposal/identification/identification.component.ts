import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginSelector } from '@app/common/login/store/login.selectors';
import { ModalService } from '@app/common/modal';
import { DOCUMENT_TYPE } from '@app/constants/document.constants';
import { ON_BOARDING_ACTIONS } from '@app/constants/onboarding.constants';
import { SIMULATION_TYPE } from '@app/constants/vehicle.constants';
import { duplicateDniValidator } from '@app/shared/directives/duplicate-dni.validator';
import { documentTypeValidator } from '@app/shared/directives/personal-document-type.validator';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DocumentType } from '../api/documentType';
import { Model } from '../api/model';
import { Persons } from '../api/person';
import { VehicleType } from '../api/vehicleType';
import { Year } from '../api/year';
import {
  IdCustomerDataForm,
  IdVehicleDataForm
} from '../models/id-data-form.model';
import { OnBoarding, OnBoardingResponse } from '../models/id-onboarding.model';
import { SelectableUserSellingPoint } from '../models/selectable-user-selling-point.model';
import { DomainsService } from '../services/domains.service';
import { OnBoardingService } from '../services/onboarding.service';
import { EXPIRED_TOKEN_MESSAGE } from './../../constants/error.constants';
import { Brand } from './../api/brand';
import { Gender } from './../api/gender';
import { CustomerComponent } from './components/customer/customer.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { IdDataForm2OnBoarding } from './mappers/id-data-form.map';
import { Coupon } from '../api/couponResponse';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit, OnDestroy {
  /* Form Groups*/
  public form: FormGroup;
  public vehicleData: FormGroup;
  /* Preload variables */
  public owner = null;
  public coOwner = null;
  public vehicle = null;
  /* Lists */
  public personalDocumentTypes: Array<DocumentType> = [];
  public genders: Array<Gender> = [];
  public brands: Array<Brand> = [];
  public models: Array<Model> = [];
  public years: Array<Year> = [];
  public yearsTo1950: Array<number> = [];
  public months: Array<string> = [];
  public coupons: Coupon[] = [];
  public persons: Persons = { owner: [], coOwner: [] };
  /* Aux variables */
  public formSubmitAttempt: boolean = false;
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();
  public userSellingPoints: SelectableUserSellingPoint[];
  public selectedSellingPoint: SelectableUserSellingPoint;
  /* Children */
  @ViewChild('a') public accordion: NgbAccordion;
  @ViewChild('owner') public ownerComponent: CustomerComponent;
  @ViewChild('coOwner') public coOwnerComponent: CustomerComponent;
  @ViewChild('vehicle') public vehicleComponent: VehicleComponent;

  constructor(
    private domainsService: DomainsService,
    public onBoardingService: OnBoardingService,
    public translate: TranslateService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.form = this.fb.group({}, { validators: [duplicateDniValidator] });
    this.generateControls();
    this.generateCustomerControls('owner');
    this.generateCustomerControls('coOwner');
    this.vehicleData = this.form.get('vehicle') as FormGroup;
  }

  ngOnInit() {
    this.store
      .pipe(
        select(loginSelector),
        select(state => state.userSellingPoints)
      )
      .subscribe(userSellingPoints => {
        this.userSellingPoints = userSellingPoints.map(sp => {
          if (sp) {
            const feat = sp.features;
            const disabled = !feat.carEnabled && !feat.utilitarianEnabled;
            return { disabled, ...sp };
          }
        });

        if (this.userSellingPoints && this.userSellingPoints.length > 0) {
          const firstEnabledSellingPoint = this.userSellingPoints.find(
            ssp => ssp.features.sellingPointActive
          );

          firstEnabledSellingPoint
            ? this.form.get('sellingPoint').patchValue(firstEnabledSellingPoint)
            : this.form
                .get('sellingPoint')
                .patchValue(this.userSellingPoints[0]);
        }
      });

    this.form
      .get('sellingPoint')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        filter(s => s)
      )
      .subscribe(sellingPoint => {
        this.getCoupon(sellingPoint);
      });

    this.vehicleData
      .get('type')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(type => {
        if (type) {
          this.vehicleComponent.simulationTypeChangeHandler();
          this.updateBrands(type);
          this.updateYears();
        }
      });

    this.vehicleData
      .get('simulationType')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(sType => {
        this.vehicleComponent.simulationTypeChangeHandler();
        this.vehicleComponent.setSimulationTypeValidators(sType);
        this.updateBrands(sType);
        this.updateYears();
      });

    this.vehicleData
      .get('brand')
      .valueChanges.pipe(
        filter(brand => brand),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(brand => {
        this.vehicleComponent.brandChangeHandler();
        this.updateModels(brand);
      });

    this.vehicleData
      .get('model')
      .valueChanges.pipe(
        filter(model => model),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.vehicleComponent.modelChangeHandler();
        this.updateYears();
      });

    this.vehicleData
      .get('year')
      .valueChanges.pipe(
        filter(year => year),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.vehicleComponent.yearChangeHandler();
      });

    this.domainsService
      .getDocumentType(DOCUMENT_TYPE.PERSONAL.ID)
      .subscribe(data => {
        this.personalDocumentTypes = data;
      });

    this.domainsService.getGender().subscribe(data => {
      this.genders = data;
    });

    this.domainsService.getVehicleType().subscribe(data => {
      this.form.get('vehicleTypes').patchValue(data);
    });

    this.months = this.domainsService.getMonths();

    this.yearsTo1950 = this.domainsService.getYearsTo1950();

    this.onBoardingService.action
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(action => {
        if (action === ON_BOARDING_ACTIONS.RESET) this.cancel();
        if (action === ON_BOARDING_ACTIONS.DISABLE) this.disableForms();
      });
  }

  selectedSellingPointChange(selected: SelectableUserSellingPoint): void {
    this.form.get('sellingPoint').patchValue(selected);
  }

  public getCoupon(selectedSellingPoint) {
    this.domainsService.getCoupon(selectedSellingPoint.code).subscribe(resp => {
      this.coupons = resp[0].coupons;
      console.log(this.coupons);
    });
  }

  updateWorkDocumentNumber(cType: 'owner' | 'coOwner', dni: string): void {
    if (!cType || !dni) return;
    this.domainsService.getPerson(dni).subscribe(data => {
      this.persons[cType] = data ? data : null;
    });
  }

  updateBrands(vType: VehicleType): void {
    if (!vType || !vType.code) return;
    this.brands = [];
    this.domainsService.getBrand(vType.code).subscribe(data => {
      this.brands = data;
    });
  }

  updateModels(brand: Brand): void {
    if (!brand) return;
    this.models = [];
    this.domainsService.getModel(brand.id).subscribe(data => {
      this.models = data;
    });
  }

  updateYears(): void {
    const vehicleData = this.form.controls['vehicle']
      .value as IdVehicleDataForm;
    this.years = [];
    if (vehicleData.simulationType === SIMULATION_TYPE.ESTIMATED_VALUE) {
      this.domainsService
        .getYearWithVehicleType(vehicleData.type.code)
        .subscribe(data => {
          this.years = data;
        });
    } else if (
      vehicleData.simulationType === SIMULATION_TYPE.BRAND_MODEL &&
      vehicleData.model
    ) {
      this.domainsService
        .getYearWithModel(vehicleData.model.id)
        .subscribe(data => {
          this.years = data;
        });
    }
  }

  private generateControls(): void {
    this.form.addControl('vehicleTypes', this.fb.control([]));
    this.form.addControl('sellingPoint', this.fb.control(null));
    this.form.addControl('hasCoOwner', this.fb.control(false));
    this.form.addControl('isMarried', this.fb.control(false));
    this.form.addControl(
      'worksInDependencyRelationship',
      this.fb.control(false)
    );

    this.form.addControl(
      'vehicle',
      this.fb.group({
        type: [null, Validators.required],
        simulationType: [SIMULATION_TYPE.BRAND_MODEL, Validators.required],
        brand: [null, Validators.required],
        model: [null, Validators.required],
        year: [null, Validators.required],
        price: ['', [Validators.required, Validators.min(1)]]
      })
    );
  }

  generateCustomerControls(customerType) {
    this.form.addControl(
      `${customerType}`,
      this.fb.group(
        {
          firstName: [null],
          lastName: [null],
          personalDocumentNumber: [null],
          workDocumentNumber: [null],
          gender: [null],
          birthDate: [null],
          personalDocumentType: [null],
          salary: ['']
        },
        {
          validators: [documentTypeValidator]
        }
      )
    );
  }

  private enableForms(): void {
    this.form.enable({ emitEvent: false });
  }

  private disableForms(): void {
    this.form.disable({ emitEvent: false });
  }

  private resetForms(): void {
    this.ownerComponent.resetForm();
    if (this.coOwnerComponent) this.coOwnerComponent.resetForm();
    this.vehicleComponent.resetForm();
    this.form.get('hasCoOwner').reset(false);
    this.form.get('isMarried').reset(false);
    this.form.get('worksInDependencyRelationship').reset(false);
    this.enableForms();
  }

  retry() {
    this.send();
  }

  submit(): void {
    this.accordion.expandAll();
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.send();
    } else {
      this.modalService.error(
        this.translate.instant('@Correct the incorrect/incomplete data'),
        ''
      );
    }
  }

  send(): void {
    const onBoardingPayload: OnBoarding = IdDataForm2OnBoarding(
      this.form.value.owner as IdCustomerDataForm,
      this.form.value.coOwner as IdCustomerDataForm,
      this.form.value.vehicle as IdVehicleDataForm,
      this.form.value.hasCoOwner,
      this.form.value.isMarried,
      this.form.value.worksInDependencyRelationship,
      this.form.value.sellingPoint,
      this.onBoardingService.uuid
    );
    this.onBoardingService.postOnBoarding(onBoardingPayload).subscribe(
      data => {
        const res: OnBoardingResponse = data;
        this.onBoardingService.uuid = res.uuid ? res.uuid : null;
        this.onBoardingService.responseHandler(res, true);
      },
      err => {
        if (err.error === EXPIRED_TOKEN_MESSAGE) {
          this.onBoardingService.uuid = '';
          this.send();
        }
      }
    );
  }

  cancel(): void {
    this.formSubmitAttempt = false;
    this.onBoardingService.uuid = '';
    this.onBoardingService.isRetry = false;
    this.enableForms();
  }

  reset(): void {
    this.formSubmitAttempt = false;
    this.onBoardingService.uuid = '';
    this.onBoardingService.isRetry = false;
    this.resetForms();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
