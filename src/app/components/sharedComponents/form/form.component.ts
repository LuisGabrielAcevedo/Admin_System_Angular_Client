import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormField, FormOutputData } from './form.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() fields: FormField[];
  @Input() model: object;
  modelToSave: object;
  constructor() {
  }

  ngOnInit() {
    this.modelToSave = this.model;
    console.log(this.fields);
    console.log(this.modelToSave);
  }

  changeValue(data: FormOutputData) {
    this.modelToSave[data.field] = data.value;
    console.log(this.modelToSave);
  }
}
