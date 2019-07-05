import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-numeric-field',
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.css']
})
export class NumericFieldComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {
    this.addSubscriptions();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
