import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { DynamicFormService } from '../../dynamic-form.service';
import { Observable } from 'rxjs';

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
    if (this.field.options.depend) {
      this.subscriptions.push(
        this.form.controls[this.field.options.depend].valueChanges.subscribe(dependValue => {
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

  public selectOptionSelected(option) {
    console.log(option);
    // this.dynamicFormService.resetControl.emit({
    //   key: this.field.key
    // });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
