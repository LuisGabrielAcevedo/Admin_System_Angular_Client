import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { DynamicFormService } from '../../dynamic-form.service';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { filter, map } from 'rxjs/operators';
import ObjectID from 'bson-objectid';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class SelectComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  constructor(public dynamicFormService: DynamicFormService) {
    super();
  }

  ngOnInit() {
    if (this.dependValue()) {
      this.subscriptions.push(
        this.form.controls[this.field.options.depend].valueChanges.pipe(
          filter(value => value),
          map(value => typeof value === 'object' ? value['_id'] : value),
          filter(value => ObjectID.isValid(value))
        ).subscribe(valueId => {
          this.loadData(valueId).subscribe(options => this.options = options);
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

  public selectOptionSelected(option: MatSelectChange) {
    this.dynamicFormService.resetControl.emit({
      key: this.field.key
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
