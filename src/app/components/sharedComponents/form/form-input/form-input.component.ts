import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormOutputData } from '../form.interfaces';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit, OnChanges {
  @Input() placeholder: string;
  @Input() field: string;
  @Input() inputValue: any;
  @Output() changeValue: EventEmitter<FormOutputData> = new EventEmitter();
  formValue = new FormControl(this.inputValue);
  private subscriptions: Subscription[] = [];
  constructor() {
  }

  ngOnInit() {
    this.formValue.setValue(this.inputValue);
    this.subscriptions.push(
      this.formValue.valueChanges
        .subscribe(newValue => {
          this.changeValue.emit({
            field: this.field,
            value: newValue
          });
        })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.inputValue);
  }
}
