import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class TextareaComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {
    this.initComponent();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
