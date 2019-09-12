import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-enum-select',
  templateUrl: './enum-select.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class EnumSelectComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {
    this.addSubscriptions();
    this.loadEmunSelectOptions();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
