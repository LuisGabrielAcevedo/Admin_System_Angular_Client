import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { FormControl } from '@angular/forms';
import debounce from 'lodash/debounce';
import { DynamicFormService } from '../../dynamic-form.service';

@Component({
  selector: 'app-async-autocomplete',
  templateUrl: './async-autocomplete.component.html',
  styleUrls: ['./async-autocomplete.component.css']
})
export class AsyncAutocompleteComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  constructor(public dynamicFormService: DynamicFormService) {
    super();
  }
  public search: FormControl;
  public showOptions = false;
  public filteredOptions: any[] = [];
  public defaultMessage: string;
  public selectedOption: any;

  public debounce = debounce(
    async (value: string) => this.filteredOptions = await this.loadAsyncSelectOptions(value), 500);

  ngOnInit() {
    this.search = new FormControl('');
    this.addSubscriptions();
    this.initAutocomplete();
  }

  public async initAutocomplete() {
    this.subscriptions.push(
      this.form.controls[this.field.key].valueChanges
        .subscribe(async (value) => {
          if (this.selectedOption) {
            this.search.patchValue(this.selectedOption[this.field.options.associationText]);
            this.dynamicFormService.dependEvent.emit({
              key: this.field.key,
              value: this.selectedOption[this.field.options.associationValue],
              clear: true
            });
          } else {
            this.showOptions = true;
            const optionSelected = await this.loadAsyncSelectOptions(value);
            this.search.patchValue(optionSelected[0][this.field.options.associationText]);
            this.dynamicFormService.dependEvent.emit({
              key: this.field.key,
              value: optionSelected[this.field.options.associationValue],
              clear: false
            });
          }
        })
    );
  }

  public async filterOptions(value: string) {
    this.showOptions = true;
    this.defaultMessage = 'No data available';
    const filterValue = value.toLowerCase();
    this.debounce(filterValue);
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
