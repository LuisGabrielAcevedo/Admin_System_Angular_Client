import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class TextFieldComponent extends BaseFieldComponent implements OnInit, OnDestroy, OnChanges {
  ngOnInit() {
    // console.log(this.model);
    this.addSubscriptions();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
