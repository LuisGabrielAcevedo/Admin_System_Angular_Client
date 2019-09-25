import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class SwitchComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {
    this.initComponent();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
