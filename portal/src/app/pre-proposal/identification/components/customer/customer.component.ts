import { VEHICLE_TYPE } from '@app/constants/vehicle.constants';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT_TYPE } from '@app/constants/document.constants';
import {
  BIRTHDATE_ERRORS,
  DNI_TYPE_ERROR,
  DUPLICATE_DNI_ERRORS,
  PERSON_ERRORS
} from '@app/constants/error.constants';
import { DocumentType } from '@app/pre-proposal/api/documentType';
import { Gender } from '@app/pre-proposal/api/gender';
import { ParsedPerson, Person } from '@app/pre-proposal/api/person';
import { VehicleType } from '@app/pre-proposal/api/vehicleType';
import { IdCustomerDataForm } from '@app/pre-proposal/models/id-data-form.model';
import { addError, removeError } from '@app/shared/directives/errors.functions';
import {
  FirstNameValidator,
  LastNameValidator
} from '@app/shared/directives/name.validator';
import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';
import {
  Under18Validator,
  Under21Validator
} from '@app/shared/validators/date.validator';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('birthDateInput') public birthDateInput: ElementRef;
  @Output() personalDocumentNumberEmit: EventEmitter<
    string
  > = new EventEmitter();
  /* Component inputs from Identification */
  @Input() customerType: 'owner' | 'coOwner';
  @Input() persons: Person[];
  @Input() formSubmitAttempt: boolean;
  @Input() personalDocumentTypes: Array<DocumentType>;
  @Input() genders: Array<Gender>;
  @Input() customer: IdCustomerDataForm;
  @Input() form: FormGroup;
  /* Objects of interest to find in input lists */
  private dniObject: DocumentType;
  /* Form groups */
  public customerData: FormGroup;
  /* Invalid Regexs */
  public VALID_DNI_REGEX = '^[0-9]{7,8}$';
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();
  /* Aux variables */
  public isWaitingForPersons: boolean = false;
  /* Error messages*/
  public duplicateDniErrorMessages: FormFieldErrorMap = {
    duplicate: DUPLICATE_DNI_ERRORS.ownerAndCoOwnerDuplicate,
    invalidDocumentType: DNI_TYPE_ERROR.invalidDocumentType
  };
  public birthDateErrorMessages: FormFieldErrorMap = BIRTHDATE_ERRORS;
  public personErrorMessages: FormFieldErrorMap = PERSON_ERRORS;

  ngOnInit() {
    this.customerData = this.form.get(`${this.customerType}`) as FormGroup;
    this.setValidators(true);
    this.preloadDefault();
    this.disableFieldsByDefault();

    this.customerData
      .get('personalDocumentType')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((type: DocumentType) => {
        const dniControl = this.customerData.get('personalDocumentNumber');
        if (!type) dniControl.patchValue(null);
        this.validateDni();
      });

    if (this.customerType === 'coOwner') {
      this.form
        .get('isMarried')
        .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(isMarried => this.addSalaryValidators(isMarried));
    }

    if (this.customerType === 'owner') {
      const truckOrUtilitaryAgeObservable: Observable<any> = merge(
        this.form.get('vehicle').get('type').valueChanges,
        fromEvent(this.birthDateInput.nativeElement, 'change')
      );
      truckOrUtilitaryAgeObservable
        .pipe(
          takeUntil(this.ngUnsubscribe),
          filter(values => values)
        )
        .subscribe(() => this.addBirthDateValidators());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.customerData) return;
    if (this.mandatoryConditionsForDataLoad(changes)) {
      this.preloadData();
      this.preloadDefault();
    }
    if (changes.persons && this.isWaitingForPersons) {
      this.updatePersons();
      this.updateWorkDocumentNumberErrors();
    }
  }

  addSalaryValidators(isMarried: boolean) {
    const salaryControl = this.customerData.get('salary');
    if (isMarried) {
      salaryControl.reset('');
      salaryControl.setValidators([Validators.required, Validators.min(23000)]);
    } else {
      salaryControl.setValidators(null);
    }
    salaryControl.updateValueAndValidity();
  }

  addBirthDateValidators() {
    const type: VehicleType = this.form.get('vehicle').get('type').value;
    const ownerBirthDate = this.customerData.get('birthDate');
    if (
      type.code === VEHICLE_TYPE.UTILITARY.CODE ||
      type.code === VEHICLE_TYPE.TRUCK.CODE
    ) {
      ownerBirthDate.setValidators([
        Validators.required,
        Under18Validator(),
        Under21Validator(),
        Validators.minLength(8)
      ]);
    } else {
      ownerBirthDate.setValidators([
        Validators.required,
        Under18Validator(),
        Validators.minLength(8)
      ]);
    }
    ownerBirthDate.updateValueAndValidity();
  }

  mandatoryConditionsForDataLoad(changes: SimpleChanges): boolean {
    const mandatoryChanges: boolean = !!(
      changes.personalDocumentTypes ||
      changes.genders ||
      changes.customerType
    );
    const mandatoryValues: boolean = !!(
      this.personalDocumentTypes &&
      this.genders &&
      this.customerType
    );
    return mandatoryChanges && mandatoryValues;
  }

  preloadData() {
    if (this.customer) this.customerData.patchValue(this.customer); // Use this when data pre-load is enabled
  }

  updateWorkDocumentNumberErrors(): void {
    const control = this.customerData.get('workDocumentNumber');
    if (this.isWaitingForPersons && !this.persons.length) {
      control.setErrors(addError(control.errors, 'notFoundCuitl'));
      control.markAsTouched();
    } else {
      control.setErrors(removeError(control.errors, 'notFoundCuitl'));
    }
  }

  validateDni() {
    const dni = this.customerData.get('personalDocumentNumber');
    const dniType = this.customerData.get('personalDocumentType');
    !dniType.value ? dni.disable() : dni.enable();
    dni.updateValueAndValidity();
    if (dni.valid && dniType.valid) {
      this.isWaitingForPersons = true;
      this.personalDocumentNumberEmit.emit(dni.value);
    }
  }

  findDni(): DocumentType {
    if (!this.dniObject && this.personalDocumentTypes.length > 0) {
      this.dniObject = this.personalDocumentTypes.find(
        doc => doc.id === DOCUMENT_TYPE.PERSONAL.TYPE.DNI
      );
    }
    return this.dniObject;
  }

  loadDefaultDni() {
    const dniControl = this.customerData.get('personalDocumentType');
    if (this.findDni()) dniControl.patchValue(this.dniObject);
  }

  resetNames(): void {
    this.customerData.get('firstName').reset();
    this.customerData.get('lastName').reset();
  }

  resetPerson() {
    const cuitl = this.customerData.get('workDocumentNumber');
    cuitl.reset();
    cuitl.disable();
    this.resetNames();
    this.persons = [];
  }

  workDocumentNumberChange(): void {
    const cuitl = this.customerData.get('workDocumentNumber').value;
    this.resetNames();
    const person: Person = this.persons.find(
      selectedPerson => selectedPerson.number === cuitl
    );
    if (person) this.preloadName(person);
  }

  updatePersons(): void {
    this.customerData.get('workDocumentNumber').enable();
    if (this.persons.length === 1) {
      this.setDefaultWorkDocumentNumber();
    }
  }

  setDefaultWorkDocumentNumber(): void {
    const cuitl = this.customerData.get('workDocumentNumber');
    cuitl.patchValue(this.persons[0].number);
    this.preloadName(this.persons[0].description ? this.persons[0] : null);
    cuitl.markAsTouched();
  }

  preloadName(person: ParsedPerson): void {
    if (!person) return;
    this.customerData.get('firstName').patchValue(person.name);
    this.customerData.get('lastName').patchValue(person.lastName);
    if (person.name) this.customerData.get('firstName').markAsTouched();
    if (person.lastName) this.customerData.get('lastName').markAsTouched();
  }

  resetForm(): void {
    this.customerData.reset();
    this.customerData.patchValue({
      firstName: null,
      lastName: null,
      personalDocumentNumber: null,
      workDocumentNumber: null,
      gender: null,
      birthDate: null,
      personalDocumentType: this.dniObject || null,
      salary: ''
    });
    this.customerData.enable();
    this.disableFieldsByDefault();
  }

  disableFieldsByDefault() {
    this.customerData.get('workDocumentNumber').disable();
  }

  setValidators(value: boolean) {
    setTimeout(() => {
      const firstNameControl: AbstractControl = this.customerData.get(
        'firstName'
      );
      const lastNameControl: AbstractControl = this.customerData.get(
        'lastName'
      );
      const personalDocumentNumberControl: AbstractControl = this.customerData.get(
        'personalDocumentNumber'
      );
      const personalDocumentTypeControl: AbstractControl = this.customerData.get(
        'personalDocumentType'
      );
      const workDocumentNumberControl: AbstractControl = this.customerData.get(
        'workDocumentNumber'
      );
      const genderControl: AbstractControl = this.customerData.get('gender');
      const birthDateControl: AbstractControl = this.customerData.get(
        'birthDate'
      );
      const salaryControl: AbstractControl = this.customerData.get('salary');

      firstNameControl.setValidators(
        value
          ? [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(40),
              FirstNameValidator()
            ]
          : null
      );

      lastNameControl.setValidators(
        value
          ? [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20),
              LastNameValidator()
            ]
          : null
      );

      personalDocumentNumberControl.setValidators(
        value
          ? [Validators.required, Validators.pattern(this.VALID_DNI_REGEX)]
          : null
      );

      personalDocumentTypeControl.setValidators(
        value ? [Validators.required] : null
      );

      workDocumentNumberControl.setValidators(
        value ? [Validators.required] : null
      );

      genderControl.setValidators(value ? [Validators.required] : null);

      birthDateControl.setValidators(
        value
          ? [Validators.required, Under18Validator(), Validators.minLength(8)]
          : null
      );

      salaryControl.setValidators(
        this.customerType === 'owner' && value
          ? [Validators.required, Validators.min(23000)]
          : null
      );
      if (!value) this.customerData.reset();
      firstNameControl.updateValueAndValidity();
      lastNameControl.updateValueAndValidity();
      personalDocumentNumberControl.updateValueAndValidity();
      personalDocumentTypeControl.updateValueAndValidity();
      workDocumentNumberControl.updateValueAndValidity();
      birthDateControl.updateValueAndValidity();
      salaryControl.updateValueAndValidity();
      genderControl.updateValueAndValidity();
    }, 10);
  }

  preloadDefault() {
    if (!this.customer || !this.customer.personalDocumentType) {
      this.loadDefaultDni();
    }
  }

  salaryCondition() {
    return this.customerType === 'owner'
      ? true
      : this.form.get('isMarried').value && this.form.get('hasCoOwner').value;
  }

  searchGenderFromStart(term: string, item: Gender): boolean {
    return item.description.toUpperCase().startsWith(term.toUpperCase());
  }

  ngOnDestroy() {
    this.setValidators(false);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
