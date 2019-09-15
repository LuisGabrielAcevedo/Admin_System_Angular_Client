import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { DynamicFormService } from '../../dynamic-form.service';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { filter } from 'rxjs/operators';
import ObjectID from 'bson-objectid';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class AutocompleteComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  constructor(public dynamicFormService: DynamicFormService) {
    super();
  }

  ngOnInit() {
    if (this.field.options.depend) {
      this.subscriptions.push(
        this.form.controls[this.field.options.depend].valueChanges.pipe(
          filter(value => ObjectID.isValid(value['_id' || 'id']))
        ).subscribe(dependValue => {
          this.loadData(dependValue['_id' || 'id']).subscribe(options => this.options = options);
        }),
        this.dynamicFormService.resetControl.subscribe(value => {
          if (value.key === this.field.options.depend) this.form.controls[this.field.key].patchValue(null);
        })
      )
    } else {
      this.loadData().subscribe(options => this.options = options);
    }
  }

  public loadData(value?: any): Observable<any> {
    return this.loadFieldOptions(value);
  }

  public displayFn(option: object): string {
    return !option ? '' : option[this.field.options.associationText];
  }

  public autocompleteOptionSelected(option: MatAutocompleteSelectedEvent) {
    this.dynamicFormService.resetControl.emit({
      key: this.field.key
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
