import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonConstants } from '@app/common/common-constants';
import { ModalService } from '@app/common/modal';
import { DOCUMENT_TYPE } from '@app/constants/document.constants';
import { USE_TYPE, VEHICLE_TYPE } from '@app/constants/vehicle.constants';
import { ProposalService } from '@app/proposal';
import { ProposalDTO } from '@app/proposal/api';
import {
  BrandAndModel,
  Model,
  UseType,
  Vehicle
} from '@app/proposal/api/proposal';
import {
  chassisValidator,
  engineValidator
} from '@app/shared/directives/chassis-and-engine.validator';
import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DomainsService } from 'src/app/pre-proposal/services/domains.service';
import { proposalSelector } from '../../state/proposal.selectors';
import {
  GetProposalRes2VehicleDataForm,
  VehicleDataForm2PatchVehicle
} from '../mappers/vehicle-data-form.map';
import { VehicleDataForm } from '../models/vehicle-data-form.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  public getProposalDTO: ProposalDTO;
  public vehicleDataForm: VehicleDataForm;
  /** FormGroup Name */
  public vehicleData: FormGroup;
  /** Lists */
  public brands: Array<BrandAndModel> = [];
  public models: Array<Model> = [];
  public years: Array<number> = [];
  public useTypes: Array<UseType> = [];
  /** Others */
  protected ngUnsubscribe: Subject<any> = new Subject();
  public domainMask = 'SSA-000';
  public formSubmitAttempt: boolean = false;
  protected proposalNumber: number;
  /** Conditional variables for template */
  public isUsed: boolean;
  public isPyme: boolean = false;
  public hasCoOwner: boolean;
  public hasCuit: boolean;
  public isAuto: boolean;
  public commercialType: UseType;
  public particularType: UseType;
  public defaultUseType: UseType;
  /** Children */
  @ViewChild('chassisNumberInput') public chassisNumberInput: ElementRef;
  @ViewChild('confirmChassisNumberInput')
  public confirmChassisNumberInput: ElementRef;
  @ViewChild('engineNumberInput') public engineNumberInput: ElementRef;
  @ViewChild('confirmEngineNumberInput')
  public confirmEngineNumberInput: ElementRef;
  @ViewChild('domainInput')
  public domainInput: ElementRef;
  /* Error messages */
  public notEqualErrorMessages: FormFieldErrorMap = {
    notEqual: {
      msg: 'Los números deben ser iguales',
      priority: 1
    }
  };

  constructor(
    private vehicleDataFormBuilder: FormBuilder,
    private domainsService: DomainsService,
    private modalService: ModalService,
    private router: Router,
    private store: Store<any>,
    private proposalService: ProposalService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.generateForms(); // Generate form
    this.disableFieldsByDefault();

    /** Microservice subscription */

    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (
          data &&
          data.proposal &&
          data.proposal.vehicle &&
          data.proposal.owner.workDocumentType &&
          data.proposal.owner.workDocumentType.id
        ) {
          // Owner/CoOwner data
          this.proposalNumber = data.proposal.proposalNumber;
          this.hasCoOwner = data.proposal.coOwner ? true : false;
          const dType = data.proposal.owner.workDocumentType.id;
          this.hasCuit = dType === DOCUMENT_TYPE.WORK.TYPE.CUIT ? true : false;
          // Vehicle Data
          const vehicle: Vehicle = data.proposal.vehicle;
          const vehicleDataForm = GetProposalRes2VehicleDataForm(data.proposal);
          this.isUsed = !vehicle.fuelYear.zeroKm;
          this.checkPyme(
            vehicle.vehicleType.filter,
            !vehicle.fuelYear.zeroKm,
            vehicle.purchaseValue
          );
          const vType = vehicle.vehicleType.filter;
          this.isAuto = vType === VEHICLE_TYPE.CAR.CODE ? true : false;
          this.fetchUseTypes();
          this.fetchBrandAndModelsList(vehicle);
          this.preloadData(vehicleDataForm);
          this.patchYearIfUsed();
          this.validateConditionalFields();
        }
      });

    this.applyDomainMask();
  }

  applyDomainMask() {
    this.vehicleData
      .get('isUsedData.domainNumber')
      .valueChanges.pipe(
        filter((val: string) => (val ? val.length > 2 : null)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        const c = value.charAt(2);
        if (!isNaN(parseInt(c, 10))) {
          this.domainMask = 'SS-A00-SS';
        } else {
          this.domainMask = 'SSA-000';
        }
      });
  }

  /**
   * Preloads data from backend into the form
   * @param vehicleData Preloaded data from backend
   */
  preloadData(vehicleData: VehicleDataForm) {
    if (!vehicleData) return;
    this.vehicleData.patchValue(vehicleData);
    this.loadDefault(vehicleData);
  }

  /**
   * Loads default data for radio button fields in case back sends them as null
   * @param vehicleData Preloaded data from backend
   */
  loadDefault(vehicleData: VehicleDataForm) {
    const gncControl = this.vehicleData.get('isUsedData.gnc');
    const hasFleetInsuranceControl = this.vehicleData.get(
      'isPymeData.hasFleetInsurance'
    );

    if (!vehicleData.isUsedData.gnc) {
      gncControl.patchValue('N');
    }
    if (vehicleData.isPymeData.hasFleetInsurance !== (false || true)) {
      hasFleetInsuranceControl.patchValue(false);
    }
  }

  /**
   * Disable fields that should be by default
   */
  disableFieldsByDefault() {
    this.vehicleData.get('brand').disable();
    this.vehicleData.get('model').disable();
    this.vehicleData.get('year').disable();
  }

  /**
   * Finds if Commercial use type Object is inside use types list
   */
  findCommercialUseType(): UseType {
    if (!this.commercialType && this.useTypes.length > 0) {
      this.commercialType = this.useTypes.find(
        type => type.code === USE_TYPE.COMMERCIAL
      );
    }
    return this.commercialType;
  }

  /**
   * Finds if Particular use type Object is inside use types list
   */
  findParticularUseType(): UseType {
    if (!this.particularType && this.useTypes.length > 0) {
      this.particularType = this.useTypes.find(
        type => type.code === USE_TYPE.PARTICULAR
      );
    }
    return this.particularType;
  }

  /**
   * Loads default value of use type field
   */
  loadDefaultUseType(): void {
    const useTypeControl = this.vehicleData.get('useType');
    if (!useTypeControl.value) {
      useTypeControl.patchValue(this.defaultUseType);
    }
  }

  /**
   * In case of estimated value simulation fetch brands and models based on selected year
   * @param vehicle Vehicle data from backend
   */
  fetchBrandAndModelsList(vehicle: Vehicle): void {
    if (vehicle.brand || vehicle.model) return;
    this.vehicleData.get('brand').enable();

    if (!vehicle.fuelYear || !vehicle.fuelYear.year) return;
    if (!vehicle.vehicleType || !vehicle.vehicleType.filter) return;

    this.domainsService
      .getBrandAndModel(
        vehicle.fuelYear.year,
        vehicle.vehicleType.filter,
        vehicle.fuelYear.zeroKm,
        vehicle.purchaseValue
      )
      .subscribe(brandData => {
        this.brands = brandData;
        this.brands.map(function(brand) {
          brand.models.map(function(model) {
            if (model.enable == false) {
              model.disabled = true;
            }
            return model;
          });
          brand.disabled = !brand.models.find(model => {
            return model.enable;
          });
          return brand;
        });
      });
  }

  /**
   * Method to retrieve use types list
   */
  fetchUseTypes(): void {
    this.domainsService.getUseTypes().subscribe(useTypes => {
      this.useTypes = useTypes;
      this.defaultUseType = !this.isAuto
        ? this.findCommercialUseType()
        : this.findParticularUseType();

      this.loadDefaultUseType();
    });
  }

  /**
   * Add string ' 0Km' in case vehicle is not used
   */
  patchYearIfUsed(): void {
    if (this.isUsed) return;
    const unPatchedYear = this.vehicleData.get('year').value;
    this.vehicleData.get('year').patchValue(unPatchedYear + ' 0Km');
  }

  /**
   * Method to update models list when user selects a brand
   * @param brand Selected brand
   */
  updateModel(): void {
    this.models = [];
    const brand = this.vehicleData.get('brand');
    const model = this.vehicleData.get('model');
    model.reset();
    if (brand.value) {
      this.models = brand.value.models;
      model.enable();
    } else {
      model.disable();
    }
  }

  /**
   * Method to check if vehicle is PyME
   * @param type type of vehicle
   * @param used if the vehicle is used
   * @param value value of vehicle
   */
  checkPyme(type: string, used: boolean, value: number): void {
    if (type === CommonConstants.TRUCK) {
      this.isPyme = true;
    } else if (type === CommonConstants.UTILITARY) {
      this.domainsService.getCompanySize(used, value, type).subscribe(data => {
        this.isPyme = data.isPyme;
        this.validateConditionalFields();
      });
    }
  }

  /**
   * Method to handle actions when useType changes.
   */
  useTypeChange(): void {
    const fleet = this.vehicleData.get('isPymeData.hasFleetInsurance');
    fleet.reset(false);
  }

  generateForms(): void {
    this.vehicleData = this.vehicleDataFormBuilder.group({
      brand: [null, Validators.required],
      model: [null, Validators.required],
      year: [null],
      useType: [null],
      chassisData: this.vehicleDataFormBuilder.group(
        {
          chassisNumber: [
            null,
            [
              Validators.required,
              Validators.minLength(17),
              Validators.maxLength(17)
            ]
          ],
          confirmChassisNumber: [
            null,
            [
              Validators.required,
              Validators.minLength(17),
              Validators.maxLength(17)
            ]
          ]
        },
        { validators: chassisValidator() }
      ),
      engineData: this.vehicleDataFormBuilder.group(
        {
          engineNumber: [
            null,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(17)
            ]
          ],
          confirmEngineNumber: [
            null,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(17)
            ]
          ]
        },
        { validators: engineValidator() }
      ),
      isUsedData: this.vehicleDataFormBuilder.group({
        gnc: ['N'],
        domainNumber: [null]
      }),
      isPymeData: this.vehicleDataFormBuilder.group({
        hasFleetInsurance: [false],
        isCommercialVehicle: [false]
      })
    });
  }

  public validateConditionalFields(): void {
    const gncControl = this.vehicleData.get('isUsedData.gnc');
    const domainNumberControl = this.vehicleData.get('isUsedData.domainNumber');
    const hasFleetInsuranceControl = this.vehicleData.get(
      'isPymeData.hasFleetInsurance'
    );
    const useTypeControl = this.vehicleData.get('useType');

    /* Set validators in case vehicle is AUTO and owner has CUIT */
    if (this.isAuto && this.hasCuit) {
      useTypeControl.setValidators([Validators.required]);
    } else {
      useTypeControl.setValidators(null);
    }

    /* Set validators in case vehicle is USED */
    if (this.isUsed) {
      gncControl.setValidators([Validators.required]);
      domainNumberControl.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);
    } else {
      gncControl.setValidators(null);
      domainNumberControl.setValidators(null);
    }

    /* Set validators in case vehicle is PyME */
    if (this.isPyme) {
      hasFleetInsuranceControl.setValidators([Validators.required]);
    } else {
      hasFleetInsuranceControl.setValidators(null);
    }

    /* Set validators in case vehicle is auto, owner has CUIT and client selects
    commercial use type */
    useTypeControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(use => {
        if (
          this.isAuto &&
          this.hasCuit &&
          use &&
          use.code === USE_TYPE.COMMERCIAL
        ) {
          hasFleetInsuranceControl.setValidators([Validators.required]);
        } else {
          hasFleetInsuranceControl.setValidators(null);
        }
      });

    gncControl.updateValueAndValidity();
    domainNumberControl.updateValueAndValidity();
    hasFleetInsuranceControl.updateValueAndValidity();
    useTypeControl.updateValueAndValidity();
  }

  submit(): void {
    this.formSubmitAttempt = true;
    if (this.vehicleData.valid) {
      const value: VehicleDataForm = this.vehicleData.getRawValue();
      const vehiclePatchPayload = VehicleDataForm2PatchVehicle(value);

      this.proposalService
        .patchVehicle(vehiclePatchPayload, this.proposalNumber)
        .subscribe(data => {
          if (data && data.ok) {
            this.router.navigate([
              'proposal/data-register/account/' + this.proposalNumber
            ]);
          }
        });
    } else {
      this.modalService.error(
        this.translate.instant(
          '@Please correct the fields with incorrect and / or incomplete data'
        ),
        this.translate.instant('@Error')
      );
    }
  }

  return(): void {
    if (this.hasCoOwner) {
      this.router.navigate([
        'proposal/data-register/coowner/' + this.proposalNumber
      ]);
    } else {
      this.router.navigate([
        'proposal/data-register/owner/' + this.proposalNumber
      ]);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
