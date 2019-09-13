import { Component, OnInit, Input } from '@angular/core';
import { FormMainGroup, MaterialFormData } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.css']
})
export class StepsFormComponent implements OnInit {
  @Input() public mainGroups: FormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  constructor() { }

  ngOnInit() {
  }

}
