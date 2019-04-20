import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseSandbox } from 'src/app/sandbox/license.sandbox';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { IUser } from 'src/app/inferfaces/user';
import { UserSandbox } from 'src/app/sandbox/user.sandbox';
import { ILicense } from 'src/app/inferfaces/license';
import { ICompany } from 'src/app/inferfaces/company';

@Component({
  selector: 'app-licenses-form',
  templateUrl: './licenses-form.component.html',
  styleUrls: ['./licenses-form.component.css']
})
export class LicensesFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: ILicense;
  loading: boolean;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  companiesList: ICompany[] = [];
  usersList: IUser[] = [];

  constructor(
    private customerSandbox: LicenseSandbox,
    private companySandbox: CompanySandbox,
    private userSanbox: UserSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private licenseSandbox: LicenseSandbox,
    private router: Router
  ) {

// 1. Revisar si viene data en la ruta
this.route.queryParams.subscribe((params) => {
  const item = params['item'];
  if (item) {
    this.item = JSON.parse(item);
  }
  });

  if (this.item) {
    // 3. Si existe item lleno el formunario con la data de item
    this.form = new FormGroup({
      _id: new FormControl(this.item._id),
      code: new FormControl(this.item.code),
      expirateAt: new FormControl(this.item.expirateAt),
      company: new FormControl(this.item.company ? this.item.company._id : undefined),
      admin: new FormControl(this.item.admin ? this.item.admin : undefined)
    });

  } else {
    // 6. Si no existe item el formulario esta vacio
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      admin: new FormControl(''),
      expirateAt: new FormControl('', [Validators.required]),
    });
    }

    console.log(this.form);
}



ngOnInit() {
  this.companySandbox.loadCompaniesList({});
  if (this.item) {
    this.userSanbox.loadUsersList({
      filters: {
        company: this.item._id
      }
    });
  }
  this.subscriptions.push(
    this.companySandbox.fetchCompaniesList().subscribe((companies) => {
      this.companiesList = companies;
    }),

    this.licenseSandbox.fetchIsLoadingLicense().subscribe(loading => {
      this.loading = loading;
    }),
    this.userSanbox.fetchUsersList().subscribe(users => {
      this.usersList = users;
    })
  );
}




buttonActionLicense() {
  if (this.form.status === 'INVALID') {
    this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' });
    } else {

      if (this.item) {
      this.licenseSandbox.updateLicense(this.form.value);
      } else {
        this.licenseSandbox.saveLicense(this.form.value);
        console.log(this.form.value);
      }
    }

}

  volver() {
    this.router.navigate(['/administration/licenses/list']);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  patchValue(option: any) {
    this.form.patchValue({
      application: option.application
    });
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
