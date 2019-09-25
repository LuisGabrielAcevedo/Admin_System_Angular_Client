import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-string-list',
  templateUrl: './string-list.component.html',
  styleUrls: ["../../dynamic-form.component.css"]
})
export class StringListComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  public item: FormControl = new FormControl('');
  ngOnInit() {
    this.initComponent();
    if (!Array.isArray(this.form.controls[this.key()].value)) {
      this.form.controls[this.key()].patchValue([]);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public addItem() {
    let items: string[] = [...this.form.controls[this.key()].value];
    items = [...items, this.item.value];
    this.form.controls[this.key()].patchValue(items);
    this.item.reset();
  }

  public removeItem(name: string) {
    let items: string[] = this.form.controls[this.key()].value;
    items = items.filter(n => n !== name);
    this.form.controls[this.key()].patchValue(items);
  }
}
