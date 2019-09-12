import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { DynamicFormService } from '../../dynamic-form.service';

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
    this.addSubscriptions();
    if (this.field.options.depend) {
      this.subscriptions.push(
        this.dynamicFormService.dependEvent.subscribe(data => {
          if (this.field.options.depend === data.key) {
            this.loadSelectOptions(data.value);
            if (data.clear) {
              this.form.controls[this.field.key].patchValue(null);
            }
          }
        })
      );
    } else {
      this.loadSelectOptions();
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
