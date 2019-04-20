import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductType } from 'src/app/inferfaces/productType';
import { AdminSystemSandbox } from 'src/app/sandbox/adminSystem.sandbox';
import { IProductCategory } from 'src/app/inferfaces/productCategory';
import { IBrand } from 'src/app/inferfaces/brand';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { MatStepper } from '@angular/material';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { BrandSandbox } from 'src/app/sandbox/brand.sandBox';
import { ProductCategorySandbox } from 'src/app/sandbox/productCategory.sandBox';
import { ProductTypeSandbox } from 'src/app/sandbox/productType.sandbox';
import { ProductSandbox } from 'src/app/sandbox/product.sanbox';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { IProduct } from 'src/app/inferfaces/product';



@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  companiesList: any[] = [];
  productCategoriesList: IProductCategory[] = [];
  brandsList: IBrand[] = [];
  productTypesList: IProductType[] = [];
  unitsList: string[] = [];
  autocompleteData: IAutocompleteData = {};
  subscriptions: Subscription[] = [];
  loadingCompanies: Boolean = false;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private companySandbox: CompanySandbox,
    private brandSandBox: BrandSandbox,
    private productCategorySandBox: ProductCategorySandbox,
    private productTypeSandbox: ProductTypeSandbox,
    private adminSystemSandbox: AdminSystemSandbox,
    private productSandBox: ProductSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.autocompleteData.placeholder = 'Empresa';
    this.firstFormGroup = this._formBuilder.group({
      company: ['', Validators.required],
      applicationCode: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      type: [''],
      price: ['', Validators.required],
      brand: [''],
      unit: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
    });
  }

  ngOnInit() {
    this.adminSystemSandbox.loadUnits();
    this.subscriptions.push(
      this.companySandbox.fetchCompaniesList().subscribe((companies) => {
        this.companiesList = companies;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
      this.brandSandBox.fetchBrandsList().subscribe((brands => {
        this.brandsList = brands;
      })),
      this.productCategorySandBox.fetchProductCategoriesList().subscribe((producCategories) => {
        this.productCategoriesList = producCategories;
      }),
      this.productTypeSandbox.fetchProductTypesList().subscribe((types) => {
        this.productTypesList = types;
      }),
      this.adminSystemSandbox.fetchUnits().subscribe((units) => {
        this.unitsList = units;
      })
    );
  }

  patchValue(option: any) {
    this.firstFormGroup.patchValue({
      company: option._id,
      applicationCode: option.application.code
    });
    this.brandSandBox.loadBrandsList({
      filters: {
        company: option._id
      }
    });
    this.productCategorySandBox.loadProductCategoriesList({
      filters: {
        company: option._id
      }
    });
    this.productTypeSandbox.loadProductTypesList({
      filters: {
        company: option._id
      }
    });
    this.createProductcharacteristics(option.application.code);
  }

  createProductcharacteristics(code) {
    // this.thirdFormGroup.patchValue(ICarSaleProduct);
    // console.log(this.thirdFormGroup.value);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }

  buttonActionProduct() {
    this.firstFormGroup.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.secondFormGroup.status === 'INVALID'
        ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
        : (console.log('enviar'));


    const secondFormGroupFiltered: object = {};
    for (const element in this.secondFormGroup.value) {
      if (this.secondFormGroup.value.hasOwnProperty(element) && this.secondFormGroup.value[element].trim().length !== 0) {
        secondFormGroupFiltered[element] = this.secondFormGroup.value[element];
      }
    }

    const dataToSend: IProduct = Object.assign(this.firstFormGroup.value, secondFormGroupFiltered);
    this.productSandBox.saveProduct(dataToSend);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
