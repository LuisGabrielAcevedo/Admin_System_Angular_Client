import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { Profession } from '@app/proposal/api/patch.proposal.req';
import { AfipActivity } from '@app/proposal/api/proposal';
import { EconomicSector } from '@app/proposal/data-register/api/economicSector';
import { EducationLevel } from '@app/proposal/data-register/api/educationLevel';
import { EnterpriseType } from '@app/proposal/data-register/api/enterpriseType';
import { Occupation } from '@app/proposal/data-register/api/occupation';
import { Role } from '@app/proposal/data-register/api/role';
import { addError, removeError } from '@app/shared/directives/errors.functions';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChildComponentOutput } from '../../models/customer-patch.model';
import { ProfessionalDataForm } from '../../models/professional-data-form.model';
import {
  DEPENDENCY_RELATIONSHIP,
  eOccupation
} from './../../../../constants/document.constants';
import { INVALID_AFIP_DATE_ERRORS } from './../../../../constants/error.constants';
import { FormFieldErrorMap } from './../../../../shared/ui-components/form-field/form-field-error.model';
import { Month } from './../../../api/patch.proposal.req';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnChanges {
  /* Component inputs from Owner/CoOwner */
  @Input() customer: ProfessionalDataForm;
  @Input() formSubmitAttempt: boolean;
  @Input() occupations: Array<Occupation>;
  @Input() roles: Array<Role>;
  @Input() professions: Array<Profession>;
  @Input() educationLevels: Array<EducationLevel>;
  @Input() enterpriseTypes: Array<EnterpriseType>;
  @Input() economicSectors: Array<EconomicSector>;
  @Input() afipActivities: Array<AfipActivity>;
  @Input() afipMonths: Array<Month>;
  @Input() afipYears: Array<number>;
  @Input() depRel: boolean;
  @Input() isOwner: boolean;
  @Input() isMarriedWithCoOwner: boolean;
  @Input() errors: FormFieldErrorMap;
  /* Component outputs to Owner/CoOwner */
  @Output() professionalComponentOutput = new EventEmitter();
  @Output() fetchRoles = new EventEmitter();
  @Output()
  fetchProfessionsEconomicSectorsAndEnterpriseTypes = new EventEmitter();
  @Output() fetchEducationLevels = new EventEmitter();
  /* Control variables */
  public afipDateActive: boolean;
  /* Form group */
  public professionalData: FormGroup;
  /* Objects of interest to find in input lists */
  private dependencyRelation: AfipActivity;
  private dependencyRelationOccupation: Occupation;
  /* Error messages */
  public invalidAfipDateErrorMessages = INVALID_AFIP_DATE_ERRORS;
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(private professionalDataFormBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.professionalData) return;
    if (this.mandatoryConditionsForDataLoad(changes)) {
      this.afipDateActive =
        (this.isOwner && !this.depRel) ||
        (!this.isOwner && !this.depRel && this.isMarriedWithCoOwner);

      this.preloadData();
      this.preloadDefault();
    }
    if (changes.professions && this.customer.profession) {
      setTimeout(() => {
        this.fetchEducationLevels.emit(this.customer.profession);
        this.professionalData.get('educationLevel').enable();
      }, 0);
    }
    if (changes.occupations) this.filterOccupations();
    if (changes.afipActivities) this.filterAfipActivities();

    this.updateErrors();
    this.updateValidators();
  }

  mandatoryConditionsForDataLoad(changes: SimpleChanges): boolean {
    const mandatoryChanges: boolean = !!(
      changes.customer ||
      changes.occupations ||
      changes.afipActivities ||
      changes.depRel ||
      changes.isMarriedWithCoOwner
    );
    const mandatoryValues: boolean = !!(
      this.customer &&
      this.occupations &&
      this.afipActivities &&
      (this.depRel === true || this.depRel === false) &&
      (this.isMarriedWithCoOwner === true ||
        this.isMarriedWithCoOwner === false)
    );
    return mandatoryChanges && mandatoryValues;
  }

  /**
   * Patch of values that come from proposal
   */
  preloadData() {
    if (!this.customer) return;
    this.professionalData.patchValue(this.customer);
    if (this.customer.occupation) {
      this.fetchRoles.emit(this.customer.occupation.id);
      this.professionalData.get('role').enable();
    }
    if (this.customer.role) {
      this.fetchProfessionsEconomicSectorsAndEnterpriseTypes.emit(
        this.customer.role.id
      );
      this.professionalData.get('profession').enable();
      this.professionalData.get('economicSector').enable();
      this.professionalData.get('enterpriseType').enable();
    }
    if (this.isOwner && this.customer.occupation && this.depRel) {
      this.professionalData.get('occupation').disable();
    }
    if (this.isOwner && this.customer.afipActivity && this.depRel) {
      this.professionalData.get('afipActivity').disable();
    }
  }

  /**
   * Patch of default values
   */
  preloadDefault() {
    if (!this.customer.occupation) this.loadDefaultOccupation();
    if (!this.customer.afipActivity) this.loadDefaultAfipActivity();
  }

  ngOnInit() {
    this.generateForms();
    // Subscription to form changes to send data to parent component when valid
    const valueChanges$ = this.professionalData.valueChanges;
    const statusChanges$ = this.professionalData.statusChanges;

    merge(valueChanges$, statusChanges$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const value: ProfessionalDataForm = this.professionalData.getRawValue();
        const payload: ChildComponentOutput = {
          value,
          valid: this.professionalData.valid,
          type: 'professional'
        };
        this.professionalComponentOutput.emit(payload);
      });

    // Init configs
    this.professionalData.get('role').disable();
    this.professionalData.get('profession').disable();
    this.professionalData.get('enterpriseType').disable();
    this.professionalData.get('economicSector').disable();
    this.professionalData.get('educationLevel').disable();
  }

  /**
   * Method to filter dependency relationship from
   * afip activities list
   */
  filterAfipActivities(): void {
    if (!this.isOwner || this.depRel) return;
    if (!this.afipActivities) return;

    this.afipActivities = this.afipActivities.filter(
      a => a.afipCode !== DEPENDENCY_RELATIONSHIP
    );
  }

  /**
   * Method to filter dependency relationship from
   * occupations list
   */
  filterOccupations(): void {
    if (!this.isOwner || this.depRel) return;
    if (!this.occupations) return;
    this.occupations = this.occupations.filter(
      o => o.integrationCode !== eOccupation.DEPENDENCY_RELATIONSHIP
    );
  }

  /**
   * Finds if Relación de Dependencia Object is inside
   * afip categories list
   */
  findDependencyRelationOccupation(): Occupation {
    if (
      !this.dependencyRelationOccupation &&
      this.occupations &&
      this.occupations.length > 0
    ) {
      this.dependencyRelationOccupation = this.occupations.find(
        code => code.integrationCode === eOccupation.DEPENDENCY_RELATIONSHIP
      );
    }
    return this.dependencyRelationOccupation;
  }

  /**
   * Loads default Afip Activity values in the screen
   */
  loadDefaultOccupation() {
    if (this.findDependencyRelationOccupation()) {
      this.professionalData
        .get('occupation')
        .patchValue(this.dependencyRelationOccupation);
      this.professionalData.get('role').enable();
      if (this.isOwner) this.professionalData.get('occupation').disable();
      this.occupationChanged(this.dependencyRelationOccupation);
    } else {
      this.professionalData.get('occupation').reset();
      this.professionalData.get('role').disable();
    }
  }

  /**
   * Finds if Relación de Dependencia Object is inside
   * afip categories list
   */
  findDependencyRelation(): AfipActivity {
    if (
      !this.dependencyRelation &&
      this.afipActivities &&
      this.afipActivities.length > 0
    ) {
      this.dependencyRelation = this.afipActivities.find(
        code => code.afipCode === DEPENDENCY_RELATIONSHIP
      );
    }
    return this.dependencyRelation;
  }

  /**
   * Loads default Afip Activity values in the screen
   */
  loadDefaultAfipActivity(): void {
    if (
      this.findDependencyRelationOccupation() &&
      this.findDependencyRelation()
    ) {
      this.professionalData
        .get('afipActivity')
        .patchValue(this.dependencyRelation);

      if (this.isOwner) this.professionalData.get('afipActivity').disable();
    } else {
      this.professionalData.get('afipActivity').reset();
    }
  }

  /**
   * Triggers emit event with the selected occupation id to fetch
   * roles
   * @param selectedOccupation Selected occupation object
   */
  occupationChanged(selectedOccupation: Occupation): void {
    this.professionalData.get('role').reset();
    this.professionalData.get('role').disable();
    if (selectedOccupation && selectedOccupation.id) {
      this.fetchRoles.emit(selectedOccupation.id);
      this.professionalData.get('role').enable();
    }
    if (!this.isOwner) {
      this.lockAfipActivity();
      this.addOrRemoveAfipActivity();
    }
    this.roleChanged(null);
  }

  /**
   * Method to patch occupation value in case the user selectes
   * works in dependency relationship in afip activities field
   * @param selectedAfipAct Selected Afip Activity
   */
  afipActivityChanged(selectedAfipAct: AfipActivity): void {
    if (selectedAfipAct.afipCode === DEPENDENCY_RELATIONSHIP) {
      const occupation = this.professionalData.get('occupation');
      occupation.patchValue(this.dependencyRelationOccupation);
      this.occupationChanged(this.dependencyRelationOccupation);
    }
  }

  /**
   * Modify afip activities list based on user selection of occupation
   */
  addOrRemoveAfipActivity(): void {
    const occ = this.professionalData.get('occupation');
    const depRel = this.findDependencyRelation();
    const isDepRelInList = !!this.afipActivities.find(a => a === depRel);
    const isDepRelOcc =
      occ.value &&
      occ.value.integrationCode === eOccupation.DEPENDENCY_RELATIONSHIP;

    if (occ.value && !isDepRelOcc && isDepRelInList) {
      this.afipActivities = this.afipActivities.filter(a => a !== depRel);
    } else if (!occ.value && !isDepRelInList) {
      const auxList = this.afipActivities.slice();
      auxList.push(depRel);
      auxList.sort((a, b) => a.id - b.id);
      this.afipActivities = auxList;
    }
  }

  /**
   * Method to disable afip activity and set it to dependency relationship
   * in case the user selects dependency relationship in occupation
   */
  lockAfipActivity(): void {
    const occupation = this.professionalData.get('occupation');
    const afip = this.professionalData.get('afipActivity');

    const disableAfip =
      occupation.value &&
      occupation.value.integrationCode === eOccupation.DEPENDENCY_RELATIONSHIP;

    if (disableAfip) {
      afip.patchValue(this.findDependencyRelation());
      afip.disable();
    } else {
      afip.reset();
      afip.enable();
    }
  }

  /**
   * Triggers emit event with the selected role id to fetch
   * professions, economic sectors and enterprise types
   * @param selectedRole Selected role object
   */
  roleChanged(selectedRole: Role): void {
    this.professionalData.get('profession').reset();
    this.professionalData.get('economicSector').reset();
    this.professionalData.get('enterpriseType').reset();
    this.professionalData.get('profession').disable();
    this.professionalData.get('economicSector').disable();
    this.professionalData.get('enterpriseType').disable();
    if (selectedRole && selectedRole.id) {
      this.fetchProfessionsEconomicSectorsAndEnterpriseTypes.emit(
        selectedRole.id
      );
      this.professionalData.get('profession').enable();
      this.professionalData.get('economicSector').enable();
      this.professionalData.get('enterpriseType').enable();
    }
    this.professionChanged(null);
  }

  /**
   * Triggers emit event with the selected profession id to fetch
   * education levels
   * @param selectedProfession Selected profession object
   */
  professionChanged(selectedProfession: Profession): void {
    this.professionalData.get('educationLevel').reset();
    this.professionalData.get('educationLevel').disable();
    if (selectedProfession && selectedProfession.educationLevels) {
      this.fetchEducationLevels.emit(selectedProfession);
      this.professionalData.get('educationLevel').enable();
    }
  }

  /**
   * Generates forms for the screen
   */
  private generateForms(): void {
    this.professionalData = this.professionalDataFormBuilder.group({
      occupation: [null, Validators.required],
      role: [null, Validators.required],
      profession: [null, Validators.required],
      educationLevel: [null, Validators.required],
      enterpriseType: [null, Validators.required],
      economicSector: [null, Validators.required],
      afipActivity: [null, Validators.required],
      afipMonth: [null, Validators.required],
      afipYear: [null, Validators.required]
    });
  }

  /**
   * Method to update validators for conditional fields in the screen
   */
  updateValidators(): void {
    const afipMonthControl = this.professionalData.get('afipMonth');
    const afipYearControl = this.professionalData.get('afipYear');
    if (this.afipDateActive) {
      afipMonthControl.setValidators(Validators.required);
      afipYearControl.setValidators(Validators.required);
    } else {
      afipMonthControl.setValidators(null);
      afipYearControl.setValidators(null);
    }
    this.professionalData.updateValueAndValidity();
  }

  /**
   * Generic method to update all errors on component
   */
  updateErrors(): void {
    this.updateAfipDateErrors();
  }

  /**
   * Check if error is in form field map object
   * @param errorName The name of the error
   */
  checkIfError(errorName: string): boolean {
    return this.errors[errorName] ? true : false;
  }

  /**
   * Method to set errors if afip init date is invalid
   */
  updateAfipDateErrors(): void {
    const control = this.professionalData.get('afipYear');
    let errorsList: ValidationErrors = null;
    const errorMsg = 'invalidAfipDate';

    if (this.checkIfError(errorMsg)) {
      errorsList = addError(control.errors, errorMsg);
      control.markAsTouched();
    } else {
      errorsList = removeError(control.errors, errorMsg);
    }
    control.setErrors(errorsList);
  }
}
