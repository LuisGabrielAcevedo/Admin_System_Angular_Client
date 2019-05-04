import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalSandbox } from 'src/app/sandbox/local.sandbox';
import { IApplication } from 'src/app/inferfaces/application';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { ILocal } from 'src/app/inferfaces/local';
import { CountrySandbox } from 'src/app/sandbox/country.sandbox';
import { ICountry } from 'src/app/inferfaces/country';

@Component({
  selector: 'app-locals-form',
  templateUrl: './locals-form.component.html',
  styleUrls: ['./locals-form.component.css']
})
export class LocalsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  forma: FormGroup;
  item: ILocal;
  loading: boolean;
  loadingCompanies: Boolean = false;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  applicationsList: IApplication[] = [];
  companiesList: any[] = [];
  countriesList: ICountry[] = [];
  autocompleteData: IAutocompleteData = {};
  constructor(
    private localSandbox: LocalSandbox,
    private companySandbox: CompanySandbox,
    private applicationSandbox: ApplicationSandbox,
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
    // 2. Setear el placeholder para el autocomplete
    this.autocompleteData.placeholder = 'Empresa';

    if (this.item) {
      // 3. Si existe item lleno el formunario con la data de item
      this.forma = new FormGroup({
        _id: new FormControl(this.item._id),
        name: new FormControl(this.item.name),
        company: new FormControl(this.item.company ? this.item.company : undefined),
        application: new FormControl({ value: this.item.application._id, disabled: true }),
        country: new FormControl({ value: this.item.country._id, disabled: true }),
        address: new FormControl(this.item.address),
        city: new FormControl(this.item.city),
        description: new FormControl(this.item.description)
      });
      // 4. Si existe item lleno el autocomplete de companies con la data en item
      this.autocompleteData.defaultOption = this.item.company;
      // 5. Si existe item una compañia seleccionada la agrego a la lista del autocomplete
      if (this.item.company) {
        this.companiesList.push({
          _id: this.item.company,
          name: this.item.company.name,
          profileImage: this.item.company.profileImage
        });
      }
    } else {
      // 6. Si no existe item el formulario esta vacio
      this.forma = new FormGroup({
        name: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        application: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl(''),
        address: new FormControl(''),
        description: new FormControl('')
      });
      // 7. Si quiero que el campo del autocomplete sea requerido
      this.autocompleteData.validations = [Validators.required];
    }
  }

  ngOnInit() {
    this.applicationSandbox.loadApplicationsList({});
    this.countrySandbox.loadCountriesList({});
    this.subscriptions.push(
      this.localSandbox.fetchIsLoadingLocal().subscribe((loading) => {
        this.loading = loading;
      }),
      this.applicationSandbox.fetchApplicationsList().subscribe((applications) => {
        this.applicationsList = applications;
      }),
      this.countrySandbox.fetchCountriesList().subscribe(countries => {
        this.countriesList = countries;
      }),
      this.companySandbox.fetchCompaniesList().subscribe((companies) => {
        this.companiesList = companies;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      })
    );
  }

  volver() {
    this.router.navigate(['/administration/locals/list']);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  patchValue(option: any) {
    this.forma.patchValue({
      company: option._id,
      application: option.application
    });
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }

  buttonActionLocal() {
    this.forma.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.localSandbox.updateLocal(this.forma.value)
        : this.localSandbox.saveLocal(this.forma.value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
