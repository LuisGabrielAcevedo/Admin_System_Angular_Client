import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class PasswordFieldComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  public hide: boolean = true;
  ngOnInit() {
    this.addSubscriptions();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
