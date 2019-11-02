import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonConstants } from '@app/common/common-constants';
import {
  DOCUMENT_TYPE,
  EXEMPT_IIBB,
  EXEMPT_IVA
} from '@app/constants/document.constants';
import { MARRIED, SINGLE } from '@app/constants/marital-status.constants';
import { PEP_TYPE } from '@app/constants/pep.constants';
import { Country } from '@app/proposal/data-register/api/country';
import { MaritalStatus } from '@app/proposal/data-register/api/maritalStatus';
import { TaxCategory } from '@app/proposal/data-register/api/taxCategory';
import { addError, removeError } from '@app/shared/directives/errors.functions';
import {
  FirstNameValidator,
  LastNameValidator
} from '@app/shared/directives/name.validator';
import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';
import { Under18Validator } from '@app/shared/validators/date.validator';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DocumentType } from 'src/app/pre-proposal/api/documentType';
import { Gender } from 'src/app/pre-proposal/api/gender';
import { ChildComponentOutput } from '../../models/customer-patch.model';
import { PersonalDataForm } from '../../models/personal-data-form.model';
import {
  ARGENTINA,
  FINAL_CONSUMER
} from './../../../../constants/document.constants';
import { DUPLICATE_DNI_ERRORS } from './../../../../constants/error.constants';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnChanges, OnDestroy {
  /* Component inputs from Owner/CoOwner */
  @Input() customer: PersonalDataForm;
  @Input() isOwner: boolean;
  @Input() isMarriedWithCoOwner: boolean;
  @Input() isPyme: boolean;
  @Input() title: string;
  @Input() formSubmitAttempt: boolean;
  @Input() personalDocumentTypes: Array<DocumentType>;
  @Input() genders: Array<Gender>;
  @Input() countries: Array<Country>;
  @Input() maritalStatusList: Array<MaritalStatus>;
  @Input() ivaCategories: Array<TaxCategory>;
  @Input() iibbCategories: Array<TaxCategory>;
  @Input() workDocumentTypes: Array<DocumentType>;
  @Input() errors: FormFieldErrorMap;
  /* Component output to Owner/CoOwner */
  @Output() personalComponentOutput = new EventEmitter();
  /* Form group */
  public personalData: FormGroup;
  /* Constants */
  public CUIT = DOCUMENT_TYPE.WORK.TYPE.CUIT;
  public CASADO = MARRIED;
  public spouseDniMask = '0.000.0009';
  /* Error Message */
  public duplicateDniErrorMessages = DUPLICATE_DNI_ERRORS;
  /* Objects of interest to find in input lists */
  private argentina: Country;
  private cuil: DocumentType;
  private cuit: DocumentType;
  private single: MaritalStatus;
  private married: MaritalStatus;
  private finalConsumer: TaxCategory;
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(private personalDataFormBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.personalData) return;
    if (this.mandatoryConditionsForDataLoad(changes)) {
      this.preloadData();
      this.preloadDefault();
    }
    this.updateErrors();
  }

  mandatoryConditionsForDataLoad(changes: SimpleChanges): boolean {
    const mandatoryChanges: boolean = !!(
      changes.customer ||
      changes.workDocumentTypes ||
      changes.maritalStatusList ||
      changes.countries ||
      changes.personalDocumentTypes ||
      changes.genders ||
      changes.ivaCategories ||
      changes.iibbCategories ||
      changes.isPyme
    );
    const mandatoryValues: boolean = !!(
      this.customer &&
      this.workDocumentTypes &&
      this.maritalStatusList &&
      this.countries &&
      this.personalDocumentTypes &&
      this.genders &&
      this.ivaCategories &&
      this.iibbCategories &&
      (this.isPyme === true || this.isPyme === false)
    );
    return mandatoryChanges && mandatoryValues;
  }

  /**
   * Patch of values that come from proposal
   */
  preloadData() {
    if (!this.customer) return;
    this.personalData.patchValue(this.customer);
    if (this.customer.nationality) {
      this.personalData.get('nationality').enable();
    }
    if (this.customer.spouseData.nationality) {
      this.personalData.get('spouseData.nationality').enable();
    }
    if (this.customer.workDocumentType && this.isPyme && this.isOwner) {
      this.personalData.get('workDocumentType').disable();
    }
  }

  /**
   * Patch of default values
   */
  preloadDefault() {
    if (!this.customer.workDocumentType) this.loadDefaultId();
    if (!this.customer.maritalStatus) this.loadDefaultMaritalStatus();
    if (!this.customer.countryOfBirth) this.loadDefaultCountry();
    if (!this.customer.ivaCategory) this.loadDefaultIvaCategory();
  }

  ngOnInit() {
    // Generate forms for the screen
    this.generateForms();
    this.disableIdentificationFields();
    this.validateConditionalFields();
    // Subscription to form changes to send data to parent component when valid.
    const valueChanges$ = this.personalData.valueChanges;
    const statusChanges$ = this.personalData.statusChanges;

    merge(valueChanges$, statusChanges$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const value: PersonalDataForm = this.personalData.getRawValue();
        let payload: ChildComponentOutput = {
          value,
          valid: this.personalData.valid,
          type: 'personal'
        };
        this.personalComponentOutput.emit(payload);
      });

    // Init config
    this.personalData.get('nationality').disable();
    this.personalData.get('spouseData.nationality').disable();
    this.dniMask();
  }

  /**
   * Mask to format DNI on the screen
   */
  dniMask() {
    this.personalData
      .get('spouseData.personalDocumentNumber')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value && value.length > 7) {
          this.spouseDniMask = '00.000.000';
        } else {
          if (this.spouseDniMask === '00.000.000') {
            setTimeout(() => (this.spouseDniMask = '0.000.0009'), 0);
          }
        }
      });
  }

  /**
   * Clears the spouse data form when CASADO is not selected
   * @param selectedMaritalStatus The user selection of marital status
   */
  clearSpouseForm(selectedMaritalStatus: MaritalStatus) {
    if (selectedMaritalStatus && selectedMaritalStatus.id !== SINGLE) {
      this.personalData.get('spouseData').reset();
    }
  }

  /**
   * Finds if object with description "Consumidor Final" exists in iva categories list and returns it
   */
  findFinalConsumer(): TaxCategory {
    if (!this.finalConsumer && this.ivaCategories.length > 0) {
      this.finalConsumer = this.ivaCategories.find(
        cat => cat.description === FINAL_CONSUMER
      );
      const i = this.ivaCategories.findIndex(
        cat => cat.description === FINAL_CONSUMER
      );
      this.ivaCategories.splice(i, 1);
    }
    return this.finalConsumer;
  }

  /**
   * Finds if CUIL Object is inside work document types list
   */
  findCuil(): DocumentType {
    if (!this.cuil && this.workDocumentTypes.length > 0) {
      this.cuil = this.workDocumentTypes.find(
        doc => doc.id === DOCUMENT_TYPE.WORK.TYPE.CUIL
      );
    }
    return this.cuil;
  }

  /**
   * Finds if CUIT Object is inside work document types list
   */
  findCuit(): DocumentType {
    if (!this.cuit && this.workDocumentTypes.length > 0) {
      this.cuit = this.workDocumentTypes.find(
        doc => doc.id === DOCUMENT_TYPE.WORK.TYPE.CUIT
      );
    }
    return this.cuit;
  }

  /**
   * Loads default CUIL/CUIT values in the screen
   */
  loadDefaultId() {
    if (this.findCuil()) {
      this.personalData.get('workDocumentType').patchValue(this.cuil);
    }
    if (this.isPyme && this.isOwner && this.findCuit()) {
      this.personalData.get('workDocumentType').patchValue(this.cuit);
      this.personalData.get('workDocumentType').disable();
    }
  }

  /**
   * Loads default value for iva category when the user selects CUIL
   */
  loadDefaultIvaCategory() {
    const workDocType: DocumentType = this.personalData.get('workDocumentType')
      .value;
    if (
      this.findFinalConsumer() &&
      workDocType &&
      workDocType.id === DOCUMENT_TYPE.WORK.TYPE.CUIL
    ) {
      this.personalData.get('ivaCategory').patchValue(this.finalConsumer);
    }
  }

  /**
   * if ivaCategory value is RESPONSABLE EXENTO sets the iibb value to EXENTO
   */
  ivaCategoryChange(): void {
    const value: TaxCategory = this.personalData.get('ivaCategory').value;
    if (value && value.description === EXEMPT_IVA) {
      const valueIibb: TaxCategory = this.iibbCategories.find(
        e => e.description === EXEMPT_IIBB
      );
      this.personalData.get('iibbCategory').patchValue(valueIibb);
    }
  }

  /**
   * Resets tax categories to their original state when
   * work document type input changes
   */
  workDocumentTypeChange() {
    this.personalData.get('ivaCategory').reset();
    this.personalData.get('iibbCategory').reset();
    this.loadDefaultIvaCategory();
  }

  /**
   * Finds if SOLTERO is in the marital status list
   */
  findSingle(): MaritalStatus {
    if (!this.single && this.maritalStatusList.length > 0) {
      this.single = this.maritalStatusList.find(ms => ms.id === SINGLE);
    }
    return this.single;
  }

  /**
   * Finds if CASADO is in the marital status list
   */
  findMarried(): MaritalStatus {
    if (!this.married && this.maritalStatusList.length > 0) {
      this.married = this.maritalStatusList.find(ms => ms.id === MARRIED);
    }
    return this.married;
  }

  /**
   * Loads default marital status in the screen
   */
  loadDefaultMaritalStatus() {
    if (this.findSingle()) {
      this.personalData.get('maritalStatus').patchValue(this.single);
      this.loadMarriedStatus();
    }
  }

  /**
   * Loads married status in screen in case the user is married
   * with his/her coOwner
   */
  loadMarriedStatus() {
    if (this.isMarriedWithCoOwner && this.findMarried()) {
      this.personalData.get('maritalStatus').patchValue(this.married);
      this.personalData.get('maritalStatus').disable();
    }
  }

  /**
   * Loads a Country match for Argentina
   */
  findArgentina(): Country {
    if (!this.argentina && this.countries.length > 0) {
      this.argentina = this.countries.find(
        country => country.description === ARGENTINA
      );
    }
    return this.argentina;
  }

  /**
   * Checks if the loaded DNI is from an Argentina native
   */
  isDniFromArgentina(): boolean {
    return (
      this.personalData.get('personalDocumentType') &&
      this.personalData.get('personalDocumentType').value &&
      this.personalData.get('personalDocumentType').value.id ===
        DOCUMENT_TYPE.PERSONAL.TYPE.DNI
    );
  }

  /**
   * Loads default country in the screen.
   */
  loadDefaultCountry() {
    if (
      this.isDniFromArgentina() &&
      this.customer &&
      this.customer.personalDocumentType &&
      this.countries &&
      this.countries.length > 0 &&
      this.findArgentina()
    ) {
      this.personalData.get('countryOfBirth').patchValue(this.argentina);
      this.setNationality(this.argentina);
    }
  }

  /**
   * Sets nationality based on country of birth choice
   */
  setNationality(country: Country) {
    if (country) {
      this.personalData.get('nationality').patchValue(country);
      this.personalData.get('nationality').enable();
    } else {
      this.personalData.get('nationality').reset();
      this.personalData.get('nationality').disable();
    }
  }

  /** Method to update the spouseCountries list when the user selects
   * DNI or DNI - Extranjero */
  updateSpouseCountries(event) {
    this.personalData.get('spouseData.countryOfBirth').reset();
    this.personalData.get('spouseData.nationality').reset();
    this.personalData.get('spouseData.nationality').disable();

    if (
      event &&
      event.id === DOCUMENT_TYPE.PERSONAL.TYPE.DNI &&
      this.findArgentina()
    ) {
      this.personalData
        .get('spouseData.countryOfBirth')
        .patchValue(this.argentina);
      this.personalData
        .get('spouseData.nationality')
        .patchValue(this.argentina);
      this.personalData.get('spouseData.nationality').enable();
    }
  }

  /**
   * Sets the spouse nationality field based on user selection in the screen
   */
  setSpouseNationality(event) {
    if (event) {
      this.personalData.get('spouseData.nationality').patchValue(event);
      this.personalData.get('spouseData.nationality').enable();
    } else {
      this.personalData.get('spouseData.nationality').reset();
      this.personalData.get('spouseData.nationality').disable();
    }
  }

  /**
   * Method to handle changes in isPep radio button
   */
  public isPepChanged() {
    const isPepControl = this.personalData.get('isPep');
    const pepTypeControl = this.personalData.get('pepType');
    const pepReasonControl = this.personalData.get('pepReason');

    if (isPepControl.value) {
      pepTypeControl.setValidators([Validators.required]);
    } else {
      pepTypeControl.reset();
      pepTypeControl.setValidators(null);
      pepReasonControl.reset();
      pepReasonControl.setValidators(null);
    }
    pepTypeControl.updateValueAndValidity();
    pepReasonControl.updateValueAndValidity();
  }

  /**
   * Method to handle changes in pepType radio button
   */
  public pepTypeChange() {
    const isPepControl = this.personalData.get('isPep');
    const pepTypeControl = this.personalData.get('pepType');
    const pepReasonControl = this.personalData.get('pepReason');

    if (isPepControl.value && pepTypeControl.value === PEP_TYPE.NATIONAL) {
      pepReasonControl.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]);
    } else {
      pepReasonControl.reset();
      pepReasonControl.setValidators(null);
    }
    pepReasonControl.updateValueAndValidity();
  }

  /**
   * Generates forms for the screen
   */
  private generateForms() {
    this.personalData = this.personalDataFormBuilder.group({
      firstName: [null],
      lastName: [null],
      birthDate: [null],
      personalDocumentType: [null],
      personalDocumentNumber: [null],
      gender: [null],
      workDocumentNumber: [null],
      workDocumentType: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      countryOfBirth: [null, Validators.required],
      nationality: [null, Validators.required],
      ivaCategory: [null],
      iibbCategory: [null],
      isPep: [false, Validators.required],
      pepType: [null],
      pepReason: [null],
      spouseData: this.personalDataFormBuilder.group({
        firstName: [null],
        lastName: [null],
        birthDate: [null],
        personalDocumentType: [null],
        personalDocumentNumber: [null],
        gender: [null],
        workDocumentType: [null],
        workDocumentNumber: [null],
        countryOfBirth: [null],
        nationality: [null]
      })
    });
  }

  /**
   * Disables fields that are filled with data from client identification
   */
  private disableIdentificationFields() {
    this.personalData.get('firstName').disable();
    this.personalData.get('lastName').disable();
    this.personalData.get('birthDate').disable();
    this.personalData.get('personalDocumentType').disable();
    this.personalData.get('personalDocumentNumber').disable();
    this.personalData.get('gender').disable();
    this.personalData.get('workDocumentNumber').disable();
  }

  /**
   * Generic method to update all errors on component
   */
  updateErrors(): void {
    this.updatePersonalDocumentNumberErrors();
  }

  /**
   * Method to set errors if any participant's dni's are equal
   */
  updatePersonalDocumentNumberErrors(): void {
    const control = this.personalData.get('spouseData.personalDocumentNumber');
    let errorsList: ValidationErrors = null;
    const errorMsgs = [
      'ownerAndOwnerSpouseDuplicate',
      'coOwnerAndOwnerSpouseDuplicate',
      'ownerSpouseAndCoOwnerSpouseDuplicate',
      'coOwnerAndCoOwnerSpouseDuplicate',
      'ownerAndCoOwnerSpouseDuplicate',
      'coOwnerSpouseAndOwnerSpouseDuplicate'
    ];

    errorMsgs.forEach(e => {
      if (this.checkIfError(e)) {
        errorsList = addError(control.errors, e);
        control.markAsTouched();
      } else {
        errorsList = !removeError(control.errors, e)
          ? errorsList
          : removeError(control.errors, e);
      }
    });
    control.setErrors(errorsList);
  }

  /**
   * Check if error is in form field map object
   * @param errorName The name of the error
   */
  checkIfError(errorName: string): boolean {
    return this.errors[errorName] ? true : false;
  }

  /**
   * Subscriptions to enable/disable validations on conditional fields
   */
  public validateConditionalFields() {
    // Tax Categories
    const ivaCategoryControl = this.personalData.get('ivaCategory');
    const iibbCategoryControl = this.personalData.get('iibbCategory');

    // Non participant spouse
    const spouseFirstNameControl = this.personalData.get(
      'spouseData.firstName'
    );
    const spouseLastNameControl = this.personalData.get('spouseData.lastName');
    const spousePersonalDocumentTypeControl = this.personalData.get(
      'spouseData.personalDocumentType'
    );
    const spousePersonalDocumentNumberControl = this.personalData.get(
      'spouseData.personalDocumentNumber'
    );
    const spouseGenderControl = this.personalData.get('spouseData.gender');
    const spouseBirthDateControl = this.personalData.get(
      'spouseData.birthDate'
    );
    const spouseWorkDocumentTypeControl = this.personalData.get(
      'spouseData.workDocumentType'
    );
    const spouseWorkDocumentNumberControl = this.personalData.get(
      'spouseData.workDocumentNumber'
    );
    const spouseCountryOfBirthControl = this.personalData.get(
      'spouseData.countryOfBirth'
    );
    const spouseNationalityControl = this.personalData.get(
      'spouseData.nationality'
    );

    this.personalData
      .get('workDocumentType')
      .valueChanges.subscribe((workDocumentType: DocumentType) => {
        if (workDocumentType) {
          if (workDocumentType.id === DOCUMENT_TYPE.WORK.TYPE.CUIL) {
            ivaCategoryControl.setValidators(null);
            iibbCategoryControl.setValidators(null);
          } else if (workDocumentType.id === DOCUMENT_TYPE.WORK.TYPE.CUIT) {
            ivaCategoryControl.setValidators([Validators.required]);
            iibbCategoryControl.setValidators([Validators.required]);
          }
        }
        ivaCategoryControl.updateValueAndValidity();
        iibbCategoryControl.updateValueAndValidity();
      });

    this.personalData
      .get('maritalStatus')
      .valueChanges.subscribe((maritalStatus: MaritalStatus) => {
        if (maritalStatus) {
          if (!this.isMarriedWithCoOwner && maritalStatus.id === MARRIED) {
            spouseFirstNameControl.setValidators([
              Validators.required,
              Validators.minLength(2),
              FirstNameValidator(),
              Validators.maxLength(40)
            ]);
            spouseLastNameControl.setValidators([
              Validators.required,
              Validators.minLength(2),
              LastNameValidator(),
              Validators.maxLength(20)
            ]);
            spousePersonalDocumentTypeControl.setValidators([
              Validators.required
            ]);
            spousePersonalDocumentNumberControl.setValidators([
              Validators.required,
              Validators.pattern(CommonConstants.VALID_DNI_REGEX)
            ]);
            spouseGenderControl.setValidators([Validators.required]);
            spouseBirthDateControl.setValidators([
              Validators.required,
              Under18Validator()
            ]);
            spouseWorkDocumentTypeControl.setValidators([Validators.required]);
            spouseWorkDocumentNumberControl.setValidators([
              Validators.required
            ]);
            spouseCountryOfBirthControl.setValidators([Validators.required]);
            spouseNationalityControl.setValidators([Validators.required]);
          } else {
            spouseFirstNameControl.setValidators(null);
            spouseLastNameControl.setValidators(null);
            spousePersonalDocumentTypeControl.setValidators(null);
            spousePersonalDocumentNumberControl.setValidators(null);
            spouseGenderControl.setValidators(null);
            spouseBirthDateControl.setValidators(null);
            spouseWorkDocumentTypeControl.setValidators(null);
            spouseWorkDocumentNumberControl.setValidators(null);
            spouseCountryOfBirthControl.setValidators(null);
            spouseNationalityControl.setValidators(null);
          }
        }
        spouseFirstNameControl.updateValueAndValidity();
        spouseLastNameControl.updateValueAndValidity();
        spousePersonalDocumentTypeControl.updateValueAndValidity();
        spousePersonalDocumentNumberControl.updateValueAndValidity();
        spouseGenderControl.updateValueAndValidity();
        spouseBirthDateControl.updateValueAndValidity();
        spouseWorkDocumentTypeControl.updateValueAndValidity();
        spouseWorkDocumentNumberControl.updateValueAndValidity();
        spouseCountryOfBirthControl.updateValueAndValidity();
        spouseNationalityControl.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
