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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConstants } from '@app/common/common-constants';
import { ValidateEmail } from '@app/shared/directives/email.validator';
import { StreetNameValidator } from '@app/shared/directives/street.validator';
import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlacklistDTO } from '../../api/blacklist';
import { Locality } from '../../api/locality';
import { MobileProvider } from '../../api/mobileProvider';
import { State } from '../../api/state';
import { ContactDataForm } from '../../models/contact-data-form.model';
import { Address } from './../../models/contact-data-form.model';
import { ChildComponentOutput } from './../../models/customer-patch.model';
import {
  ValidateCellPhoneAllTheSame,
  ValidateCellPhoneTotalNum,
  ValidateCellPhoneBlacklist
} from '@app/shared/validators/phone.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges, OnDestroy {
  /* Component inputs from Owner/CoOwner */
  @Input() customer: ContactDataForm;
  @Input() isMarriedWithCoOwner: boolean;
  @Input() isOwner: boolean;
  @Input() formSubmitAttempt: boolean;
  @Input() states: Array<State>;
  @Input() localities: Array<Locality>;
  @Input() mobileProviders: Array<MobileProvider>;
  @Input() normalizedAddress: Address;
  @Input() cellPhoneIsBlacklisted: boolean;

  /* Component outputs to Owner/CoOwner */
  @Output() contactComponentOutput = new EventEmitter();
  @Output() fetchLocalities = new EventEmitter();
  @Output() fetchNormalizedAddress = new EventEmitter();
  @Output() cellPhoneBlacklistNumber = new EventEmitter();
  /* Form group */
  public contactData: FormGroup;
  /* Subject to destroy all subscriptions */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(private contactDataFormBuilder: FormBuilder) {}

  /* Error messages */
  public invalidNumber: FormFieldErrorMap = {
    totalNumber: {
      msg: 'Número inválido', // Codigo y numero deben ser 10 digitos
      priority: 1
    },
    blacklist: {
      msg: 'Número inválido', // El numero esta en la lista negra
      priority: 2
    },
    allTheSame: {
      msg: 'Número inválido', // Todos los dígitos son iguales
      priority: 3
    }
  };
  ngOnChanges(changes: SimpleChanges) {
    if (!this.contactData) return;
    if (this.mandatoryConditionsForDataLoad(changes)) {
      this.preloadData();
    }
    if (changes.normalizedAddress && this.normalizedAddress) {
      const address = this.contactData.get('address');
      const nAddress = this.normalizedAddress;
      this.normalizeState(nAddress);
      address.get('street').patchValue(nAddress.street);
      address.get('number').patchValue(nAddress.number);
      address.get('postalCode').patchValue(nAddress.postalCode);
    }
    if (changes.cellPhoneIsBlacklisted) {
      this.contactData.get('cellPhone.number').updateValueAndValidity();
    }
  }

  mandatoryConditionsForDataLoad(changes: SimpleChanges): boolean {
    const mandatoryChanges: boolean = !!(
      changes.customer ||
      changes.isOwner ||
      changes.isMarriedWithCoOwner ||
      changes.states ||
      changes.mobileProviders
    );
    const mandatoryValues: boolean = !!(
      this.customer &&
      this.states &&
      this.mobileProviders &&
      (this.isOwner === true || this.isOwner === false) &&
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
    this.contactData.patchValue(this.customer);
    if (this.customer.address) {
      const address = this.customer.address;
      if (address.state) {
        this.fetchLocalities.emit(this.customer.address.state.id);
        this.contactData.get('address.locality').enable();
      }
      if (address.locality) {
        this.contactData.get('address.street').enable();
      }
      if (address.street) {
        this.contactData.get('address.number').enable();
      }
      if (
        address.state &&
        address.locality &&
        address.street &&
        address.number
      ) {
        this.contactData.get('address.postalCode').enable();
      }
    }

    if (!this.isOwner && this.isMarriedWithCoOwner) {
      this.contactData.get('address').disable();
    }
  }

  ngOnInit() {
    this.generateForms();

    // Subscription to form changes to send data to parent component when valid
    this.contactData.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const value: ContactDataForm = this.contactData.getRawValue();
        let payload: ChildComponentOutput = {
          value,
          valid: this.contactData.valid,
          type: 'contact'
        };
        this.contactComponentOutput.emit(payload);
      });

    // Init configs
    this.contactData.get('address.locality').disable();
    this.contactData.get('address.street').disable();
    this.contactData.get('address.number').disable();
    this.contactData.get('address.postalCode').disable();
  }

  /**
   * Capture (blur) event from Cellphone Number and area code fields
   * If they both have value, it's emited to the parent to check if it is blacklisted
   */
  cellPhoneChanged() {
    const areaCode = this.contactData.get('cellPhone.areaCode');
    const cellNum = this.contactData.get('cellPhone.number');
    if (!cellNum.value || !areaCode.value) return;

    const fullCellPhoneNumber: BlacklistDTO = {
      prefix: areaCode.value,
      number: cellNum.value
    };
    this.cellPhoneBlacklistNumber.emit(fullCellPhoneNumber);
  }

  /**
   * Method to enable/disable locality field and fetch
   * date for it based on state change
   * @param selectedState Selected state
   */
  stateChange(selectedState: State) {
    this.contactData.get('address.locality').reset();
    this.contactData.get('address.locality').disable();
    if (selectedState && selectedState.id) {
      this.fetchLocalities.emit(selectedState.id);
      this.contactData.get('address.locality').enable();
    }
    this.localityChange(null);
  }

  /**
   * Method to enable/disable street field based on locality
   * change
   * @param selectedLocality Selected locality
   */
  localityChange(selectedLocality: Locality) {
    this.contactData.get('address.street').reset();
    this.contactData.get('address.street').disable();
    if (selectedLocality) {
      this.contactData.get('address.street').enable();
    }
    this.streetChange();
  }

  streetChange() {
    const street = this.contactData.get('address.street');
    this.contactData.get('address.number').reset();
    this.contactData.get('address.number').disable();
    this.contactData.get('address.postalCode').reset();
    if (street.value && street.valid) {
      this.contactData.get('address.number').enable();
    }
  }

  /**
   * Method to emit value of address in form when minimum fields
   * required to consult Merlin service are valid.
   */
  updateAddress(): void {
    const state = this.contactData.get('address.state').valid;
    const locality = this.contactData.get('address.locality').valid;
    const street = this.contactData.get('address.street').valid;
    const streetNumber = this.contactData.get('address.number').valid;
    if (state && locality && street && streetNumber) {
      this.fetchNormalizedAddress.emit(this.contactData.get('address').value);
      this.contactData.get('address.postalCode').enable();
    }
  }

  /**
   * Method to normalize the state, clean it's ID and patch it
   * into the form
   * @param address Complete address from normalizer
   */
  normalizeState(address: Address) {
    const nState = address.state.id;
    const cleanId = nState.startsWith('0') ? nState.slice(1) : nState;
    const state = this.states.find(s => s.id === cleanId);
    if (state) this.contactData.get('address.state').patchValue(state);
  }

  /**
   * Generates forms for the screen
   */
  private generateForms() {
    this.contactData = this.contactDataFormBuilder.group({
      address: this.contactDataFormBuilder.group({
        state: [null, Validators.required],
        locality: [null, Validators.required],
        street: [
          null,
          [Validators.required, Validators.maxLength(50), StreetNameValidator()]
        ],
        number: [
          null,
          [
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern(CommonConstants.NUMBERS_REGEX)
          ]
        ],
        floor: [
          null,
          [
            Validators.maxLength(3),
            Validators.pattern(CommonConstants.ALPHANUMERIC_REGEX)
          ]
        ],
        apartment: [
          null,
          [
            Validators.maxLength(3),
            Validators.pattern(CommonConstants.ALPHANUMERIC_REGEX)
          ]
        ],
        postalCode: [
          null,
          [
            Validators.required,
            Validators.pattern(CommonConstants.ALPHANUMERIC_REGEX),
            Validators.maxLength(4)
          ]
        ]
      }),
      cellPhone: this.contactDataFormBuilder.group(
        {
          areaCode: [
            null,
            [
              Validators.required,
              Validators.maxLength(4),
              Validators.minLength(2),
              Validators.pattern(CommonConstants.NUMBERS_REGEX)
            ]
          ],
          number: [
            null,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(8),
              Validators.pattern(CommonConstants.NUMBERS_REGEX)
            ]
          ],
          provider: [null, Validators.required]
        },
        {
          validator: [
            ValidateCellPhoneAllTheSame(),
            ValidateCellPhoneTotalNum(),
            ValidateCellPhoneBlacklist(() => this.cellPhoneIsBlacklisted)
          ]
        }
      ),
      email: [null, [Validators.required, ValidateEmail()]]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
