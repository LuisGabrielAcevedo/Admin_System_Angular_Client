import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class DatepickerComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {
    this.initComponent();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
