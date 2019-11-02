import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalButton } from './../../../common/modal/modal-button';
import {
  Doubt,
  NormalizerResponse
} from './../../../proposal/data-register/models/address-normalizer.model';
import { Address } from './../../../proposal/data-register/models/contact-data-form.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.scss']
})
export class AddressSelectorComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() inputData: NormalizerResponse;
  @Input() buttons: Array<ModalButton>;
  @Input() closeBtnAction: Function;

  @Output() emitAddress = new EventEmitter();

  public addressList: any[];
  public normalizedAddressForm: FormGroup;
  public disableButton: boolean = true;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public translate: TranslateService,
    public activeModal: NgbActiveModal,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.generateForm();
    this.addressList = this.inputData.listOfDoubts.map(e => {
      return { ...e, parsedAddress: this.parseAddress(e) };
    });
    const street = this.normalizedAddressForm.get('street');
    const streetNumber = this.normalizedAddressForm.get('number');
    streetNumber.disable();
    this.normalizedAddressForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(val => {
        this.disableButton =
          street.value &&
          streetNumber.value &&
          street.valid &&
          streetNumber.valid
            ? false
            : true;
      });
  }

  parseAddress(e: Doubt) {
    return `${e.streetName} ${e.numberMin}-${
      e.numberMax
    }, ${e.localityDesc.trim()}`;
  }

  addressChange(address: Address) {
    if (!address) {
      this.normalizedAddressForm.get('number').reset();
      this.normalizedAddressForm.get('number').disable();
    } else {
      this.normalizedAddressForm.get('number').enable();
      const streetControl = this.normalizedAddressForm.get('street');
      const numberControl = this.normalizedAddressForm.get('number');
      numberControl.setValidators([
        Validators.min(streetControl.value.numberMin),
        Validators.max(streetControl.value.numberMax)
      ]);
    }
  }

  submit() {
    if (!this.normalizedAddressForm.valid) return;
    this.emitAddress.emit(this.normalizedAddressForm.value);
    this.activeModal.close('Close click');
  }

  generateForm() {
    this.normalizedAddressForm = this.fb.group({
      street: [null],
      number: [null]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
