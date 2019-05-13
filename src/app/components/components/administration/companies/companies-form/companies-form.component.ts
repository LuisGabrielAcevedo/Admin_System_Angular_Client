import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from 'src/app/inferfaces/company';
import { IApplication } from 'src/app/inferfaces/application';
import { ICountry } from 'src/app/inferfaces/country';
import { CompanyService } from 'src/app/services/http/company.service';
import { ApplicationService } from 'src/app/services/http/application.service';
import { UserService } from 'src/app/services/http/user.service';
import { CountryService } from 'src/app/services/http/country.service';
import { ILoadRequest, IApiResponse } from 'src/app/inferfaces/loadRequest';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.css']
})
export class CompaniesFormComponent implements OnInit, OnDestroy {
  loadingForm: boolean;
  form: FormGroup;
  item: ICompany;
  loading: boolean;
  applicationsList: IApplication[] = [];
  currenciesList: string[] = ['BS S', 'AR $', 'US $'];
  usersList: any[] = [];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  countriesList: ICountry[] = [];
  file: File;
  image: string = null;
  constructor(
    private companyService: CompanyService,
    private applicationService: ApplicationService,
    private userService: UserService,
    private countryService: CountryService,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadingForm = true;
    this.route.paramMap.subscribe(params => {
      const id : string = params.get("id");
      id ? this.findCompany(id) : this.loadForm();
    });
  }

  loadForm() {
    if (this.item) {
      this.image = this.item.profileImage ? this.item.profileImage.url : null;
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        name: new FormControl(this.item.name),
        country: new FormControl({ value: this.item.country ? this.item.country._id : undefined, disabled: true }),
        application: new FormControl({ value: this.item.application ? this.item.application._id : undefined, disabled: true }),
        currencies: new FormControl({value: this.item.currencies, disabled: true}),
        admin: new FormControl(this.item.admin ? this.item.admin._id : undefined)
      });
      this.loadUsers({
        filters: {
          company: this.item._id
        }
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        application: new FormControl('', [Validators.required]),
        currencies: new FormControl([])
      });
    }
    this.loadingForm = false;
  }

  ngOnInit() {
    this.loadApplications({});
    this.loadCountries({});
  }

  findCompany(id: string) {
    this.companyService.getCompany(id).subscribe(resp => {
      this.item = resp.data;
      this.loadForm();
    })
  }

  volver() {
    this.router.navigate(['/administration/companies/list']);
  }

  buttonActionCompany() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
      ? this.action('UPDATE')
      : this.action('SAVE')
  }

  action(action: string) {
    this.loading = true;
    action === 'UPDATE'
    ? this.companyService.updateCompany(this.form.value, this.file).subscribe(
      resp => this.afterButtonActionSucces(resp),
      error => console.log(error))
    : this.userService.saveUser(this.form.value).subscribe(
      resp => this.afterButtonActionSucces(resp),
      error => console.log(error));
  }

  afterButtonActionSucces(resp: IApiResponse) {
    this.snackBarSandbox.sendMessage({action: '', message: resp.msg});
    this.loading= false;
    this.volver();
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  setFile(file: File) {
    this.file = file;
  }

  ngOnDestroy() {}

  loadApplications(loadRequestData: ILoadRequest) {
    this.applicationService.getApplicationsList(loadRequestData).subscribe(applications => {
      this.applicationsList = applications.data;
    })
  }

  loadCountries(loadRequestData: ILoadRequest) {
    this.countryService.getCountriesList(loadRequestData).subscribe(countries => {
      this.countriesList = countries.data;
    })
  }

  loadUsers(loadRequestData: ILoadRequest) {
    this.userService.getUsersList(loadRequestData).subscribe(users => {
      this.usersList = users.data;
    })
  }
}
