import { Component, OnInit, Input } from '@angular/core';
import { FormTabs } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.css']
})
export class StepsFormComponent implements OnInit {
  @Input() public tabs: FormTabs[];
  @Input() public form: FormGroup;
  @Input() public appearance: string;
  @Input() public id: string;
  constructor() { }

  ngOnInit() {
  }

}
