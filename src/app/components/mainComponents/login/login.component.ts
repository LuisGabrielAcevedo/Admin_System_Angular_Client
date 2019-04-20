import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.email]),
      clave: new FormControl(null, Validators.required),
      recuerdame: new FormControl(false)
    });
  }

  ngOnInit() {
  }

}
