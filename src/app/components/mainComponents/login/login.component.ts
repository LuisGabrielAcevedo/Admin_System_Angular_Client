import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthSandbox } from 'src/app/sandbox/authSanbox';
import { ILoginRequest } from '../../../inferfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authSandbox: AuthSandbox
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  login() {
    const user: ILoginRequest = this.form.value;
    this.authSandbox.login(user);
  }

}
