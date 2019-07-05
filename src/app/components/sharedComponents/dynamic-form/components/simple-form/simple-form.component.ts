import { Component, OnInit, Input } from '@angular/core';
import { FormTabs, FormModel } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {
  @Input() public tab: FormTabs;
  @Input() public form: FormGroup;
  @Input() public appearance: string;
  @Input() public id: string;
  constructor() { }

  ngOnInit() {
  }
}
