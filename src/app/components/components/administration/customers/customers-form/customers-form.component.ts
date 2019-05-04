import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { ICustomer } from 'src/app/inferfaces/customer';
import { CustomerSandbox } from 'src/app/sandbox/customer.sandbox';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: ICustomer;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  companiesList: any[] = [];
  autocompleteData: IAutocompleteData = {};
  loadingCompanies: Boolean = false;
  loading: boolean;
  file: File;
  image: string = null;
  constructor(
    private customerSandbox: CustomerSandbox,
    private companySandbox: CompanySandbox,
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
      this.image = this.item.profileImage ? this.item.profileImage.url : null;
      // 3. Si existe item lleno el formunario con la data de item
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        email: new FormControl(this.item.email),
        firstName: new FormControl(this.item.firstName),
        lastName: new FormControl(this.item.lastName),
        phone: new FormControl(this.item.phone),
        documentType: new FormControl(this.item.customerInformation ? this.item.customerInformation.documentType : null),
        documentNumber: new FormControl(this.item.customerInformation ? this.item.customerInformation.documentNumber : null),
        company: new FormControl(this.item.company ? this.item.company._id : undefined),
        application: new FormControl(this.item.application ? this.item.application._id : undefined),
      });

      this.autocompleteData.defaultOption = this.item.company;
      if (this.item.company) {
        this.companiesList.push({
          _id: this.item.company._id,
          name: this.item.company.name,
          profileImage: this.item.company.profileImage
        });
      }
    } else {
      // 6. Si no existe item el formulario esta vacio
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        phone: new FormControl(''),
        documentType: new FormControl(''),
        documentNumber: new FormControl(''),
        company: new FormControl(''),
        application: new FormControl('')
      });
    }
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }


  ngOnInit() {
    this.subscriptions.push(
      this.companySandbox.fetchCompaniesList().subscribe((companies) => {
        this.companiesList = companies;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe(loading => {
        this.loadingCompanies = loading;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
      this.customerSandbox.fetchIsLoadingCustomers().subscribe(loading => {
        this.loading = loading;
      }),
    );
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }


  buttonActionCustomer() {
    if (this.form.status === 'INVALID') {
      this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' });
    } else {
      if (this.item) {
        this.customerSandbox.updateCustomer(this.form.value, this.file);
      } else {
        this.customerSandbox.saveCustomer(this.form.value);
      }
    }
  }

  setFile(file: File) {
    this.file = file;
  }

  volver() {
    this.router.navigate(['/administration/customers/list']);
  }

  patchValue(option: any) {
    this.form.patchValue({
      company: option._id,
      application: option.application
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
