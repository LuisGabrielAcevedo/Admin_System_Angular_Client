import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { IAdmin } from 'src/app/inferfaces/admin';
import { AdminSandbox } from 'src/app/sandbox/admin.sandbox';

@Component({
  selector: 'app-admins-form',
  templateUrl: './admins-form.component.html',
  styleUrls: ['./admins-form.component.css']
})
export class AdminsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  forma: FormGroup;
  item: IAdmin;
  file: File;
  loading: boolean;
  constructor(
    private adminSandbox: AdminSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      const item = params['item'];
      if (item) {
        this.item = JSON.parse(item);
      }
    });
  }

  ngOnInit() {
    if (this.item) {
      this.forma = new FormGroup({
        _id: new FormControl(this.item._id),
        email: new FormControl({ value: this.item.email, disabled: true }),
        userName: new FormControl({ value: this.item.userName, disabled: true }),
        firstName: new FormControl(this.item.firstName),
        lastName: new FormControl(this.item.lastName)
      });
    } else {
      this.forma = new FormGroup({
        password: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required]),
        firstName: new FormControl(''),
        lastName: new FormControl('')
      });
    }

    this.subscriptions.push(
      this.adminSandbox.fetchIsLoadingAdmin()
        .subscribe(loading => {
          this.loading = loading;
        })
    );
  }

  buttonActionAdmin() {
    this.forma.status === 'INVALID' ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' }) :
      this.item ? this.adminSandbox.updateAdmin(this.forma.value, this.file) :
        this.adminSandbox.saveAdmin(this.forma.value);
  }

  volver() {
    this.router.navigate(['/administration/admins/list']);
  }

  setFile(file: File) {
    this.file = file;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
