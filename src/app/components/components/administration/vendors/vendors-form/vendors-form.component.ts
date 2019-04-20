import { IVendor } from 'src/app/inferfaces/vendor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VendorSandbox } from 'src/app/sandbox/vendor.sandbox';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.css']
})
export class VendorsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: IVendor;
  loading: boolean;
  loadingCompanies: Boolean = false;
  companiesList: any[] = [];
  autocompleteData: IAutocompleteData = {};

  constructor(
    private vendorSandBox: VendorSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private companySandbox: CompanySandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const item = params['item'];
      if (item) {
        this.item = JSON.parse(item);
      }
    });
    this.autocompleteData.placeholder = 'Empresa';

    if (this.item) {
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        vendorName: new FormControl(this.item.vendorName),
        companyName: new FormControl(this.item.companyName),
        email: new FormControl(this.item.email),
        phone1: new FormControl(this.item.phone1),
        phone2: new FormControl(this.item.phone2),
        createdBy: new FormControl(this.item.createdBy ? this.item.createdBy._id : undefined),

      });
      this.autocompleteData.defaultOption = this.item.createdBy;
      if (this.item.createdBy) {
        this.companiesList.push({
          _id: this.item.createdBy._id,
          name: this.item.createdBy.name,
          profileImage: this.item.createdBy.profileImage
        });
      }
    } else {
      this.form = new FormGroup({
        vendorName: new FormControl('', [Validators.required]),
        companyName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone1: new FormControl(''),
        phone2: new FormControl(''),
        createdBy: new FormControl('', [Validators.required])
      });
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      this.vendorSandBox.fetchIsLoadingVendor().subscribe((loading) => {
        this.loading = loading;
      }),
      this.vendorSandBox.fetchIsLoadingVendors().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
      this.companySandbox.fetchCompaniesList().subscribe((companies) => {
        this.companiesList = companies;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
    );
  }


  volver() {
    this.router.navigate(['/administration/vendors/list']);
  }

  patchValue(option: any) {
    this.form.patchValue({
      createdBy: option._id,
    });
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }


  buttonActionVendor() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.vendorSandBox.updateVendor(this.form.value)
        : this.vendorSandBox.saveVendor(this.form.value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
