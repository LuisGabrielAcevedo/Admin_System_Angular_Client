import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormComponent } from './dynamic-form.mixin';
import { FormBuilder } from '@angular/forms';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { FormField, FormModel } from './dynamic-form.interfaces';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent extends FormComponent implements OnInit, OnChanges {
  constructor(public fb: FormBuilder, public dynamicFormService: DynamicFormService) {
    super(fb, dynamicFormService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fields: FormField[] = changes.fieldsConfig ? changes.fieldsConfig.currentValue : undefined;
    const model: FormModel = changes.model ? changes.model.currentValue : undefined;
    if (fields && fields.length) {
      this.tabsFormatted = cloneDeep(this.formatFields());
      // console.log(this.tabsFormatted);
      // console.log(this.form.value);
    }
    if (model) {
      this.currentModel = cloneDeep(model);
      this.updateForm(model);
    }
  }

  public submit() {
    if (this.form.valid) {
      Object.keys(this.form.value).forEach(key => {
        set(this.currentModel, key!, this.form.value[key]);
      });
      console.log(this.currentModel);
    } else {
      this.validateForm(this.form);
      console.log(this.form);
    }
  }
}
