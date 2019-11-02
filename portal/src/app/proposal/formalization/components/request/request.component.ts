import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventEmitter } from 'events';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() public formSubmitAttempt = false;
  @Input() public formRequest: FormGroup;

  constructor() {}

  ngOnInit() {}
}
