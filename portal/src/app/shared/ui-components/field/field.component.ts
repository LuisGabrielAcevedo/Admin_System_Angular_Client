import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() errors: Array<string> = [];
  @Input() required: boolean = false;

  constructor() {}

  ngOnInit() {}
}
