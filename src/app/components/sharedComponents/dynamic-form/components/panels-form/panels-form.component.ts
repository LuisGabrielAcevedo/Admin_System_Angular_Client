import { Component, OnInit, Input } from '@angular/core';
import { FormMainGroup } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panels-form',
  templateUrl: './panels-form.component.html',
  styleUrls: ['./panels-form.component.css']
})
export class PanelsFormComponent implements OnInit {
  @Input() public mainGroups: FormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public appearance: string;
  @Input() public id: string;
  constructor() { }

  ngOnInit() {
  }

}
