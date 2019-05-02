import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from 'src/app/inferfaces/company';
import { IApplication } from 'src/app/inferfaces/application';
import { ICountry } from 'src/app/inferfaces/country';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { UserSandbox } from 'src/app/sandbox/user.sandbox';
import { CountrySandbox } from 'src/app/sandbox/country.sandbox';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.css']
})
export class CompaniesFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: ICompany;
  loading: boolean;
  applicationsList: IApplication[];
  currenciesList: string[] = ['BS S', 'AR $', 'US $'];
  usersList: any[] = [];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  countriesList: ICountry[] = [];
  file: File;
  constructor(
    private companySandbox: CompanySandbox,
    private applicationSandbox: ApplicationSandbox,
    private userSanbox: UserSandbox,
    private countrySandbox: CountrySandbox,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
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
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        name: new FormControl(this.item.name),
        country: new FormControl({ value: this.item.country ? this.item.country._id : undefined, disabled: true }),
        application: new FormControl({ value: this.item.application ? this.item.application._id : undefined, disabled: true }),
        currencies: new FormControl({value: this.item.currencies, disabled: true}),
        admin: new FormControl(this.item.admin ? this.item.admin._id : undefined)
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        application: new FormControl('', [Validators.required]),
        currencies: new FormControl([])
      });
    }
  }

  ngOnInit() {
    this.applicationSandbox.loadApplicationsList({});
    this.countrySandbox.loadCountriesList({});
    if (this.item) {
      this.userSanbox.loadUsersList({
        filters: {
          company: this.item._id
        }
      });
    }
    this.subscriptions.push(
      this.applicationSandbox.fetchApplicationsList().subscribe(applications => {
        this.applicationsList = applications;
      }),
      this.countrySandbox.fetchCountriesList().subscribe(countries => {
        this.countriesList = countries;
      }),
      this.userSanbox.fetchUsersList().subscribe(users => {
        this.usersList = users;
      }),
      this.companySandbox.fetchIsLoadingCompany().subscribe(loading => {
        this.loading = loading;
      })
    );
  }

  volver() {
    this.router.navigate(['/administration/companies/list']);
  }

  buttonActionCompany() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.companySandbox.updateCompany(this.form.value, this.file)
        : this.companySandbox.saveCompany(this.form.value);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  setFile(file: File) {
    this.file = file;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
