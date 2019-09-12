import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { FormControl, ValidatorFn } from '@angular/forms';
import { DynamicFormService } from '../../dynamic-form.service';
import { FormattedValidations } from '../../dynamic-form.interfaces';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  constructor(public dynamicFormService: DynamicFormService) {
    super();
  }
  public search: FormControl;
  public showOptions = false;
  public filteredOptions: any[] = [];
  public defaultMessage: string;
  public selectedOption: any;

  ngOnInit() {
    if (this.field.options && this.field.options.validators) {
      const formattedValidations: FormattedValidations = this.dynamicFormService.formatValidations(this.field.options.validators, this.form);
      this.search = new FormControl('', formattedValidations.validations);
      this.search['errorMessages'] = formattedValidations.errorMessages;
    } else {
      this.search = new FormControl('');
    }
    this.addSubscriptions();
    this.initAutocomplete();
  }

  public async initAutocomplete() {
    await this.loadSelectOptions();
    if (this.field.options.depend) {
      this.subscriptions.push(
        this.dynamicFormService.dependEvent.subscribe(async (data) => {
          if (this.field.options.depend === data.key) {
            await this.loadSelectOptions(data.value);
            if (data.clear) {
              this.form.controls[this.field.key].patchValue(null);
              this.search.patchValue(null);
            }
          }
        })
      );
    }
    this.subscriptions.push(
      this.form.controls[this.field.key].valueChanges
        .subscribe(value => {
          if (this.selectedOption) {
            this.search.patchValue(this.selectedOption[this.field.options.associationText]);
            this.dynamicFormService.dependEvent.emit({
              key: this.field.key,
              value: this.selectedOption[this.field.options.associationValue],
              clear: true
            });
          } else {
            if (value) {
              const optionSelected = this.options.find(option => option[this.field.options.associationValue] === value);
              this.search.patchValue(optionSelected[this.field.options.associationText]);
              this.dynamicFormService.dependEvent.emit({
                key: this.field.key,
                value: optionSelected[this.field.options.associationValue],
                clear: false
              });
            }
          }
        }),
      this.dynamicFormService.validateControls.subscribe(() => {
        this.search.markAsTouched({ onlySelf: true });
      })
    );
  }

  public filterOptions(value: string) {
    this.showOptions = true;
    this.defaultMessage = 'No data available';
    const filterValue = new RegExp(value, 'gi');
    this.filteredOptions = this.options.filter(option => option[this.field.options.associationText].toLowerCase().match(filterValue));
  }

  public selectOption(option: any) {
    this.selectedOption = option;
    this.form.controls[this.field.key].patchValue(this.selectedOption[this.field.options.associationValue]);
    this.closeAutocomplete();
  }

  public closeAutocomplete() {
    this.defaultMessage = null;
    this.showOptions = false;
    this.filteredOptions = [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
