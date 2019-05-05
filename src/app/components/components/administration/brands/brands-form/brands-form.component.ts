import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { IBrand } from 'src/app/inferfaces/brand';
import { BrandSandbox } from 'src/app/sandbox/brand.sandBox';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.css']
})
export class BrandsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: IBrand;
  loading: boolean;
  loadingCompanies: Boolean = false;
  companiesList: any[] = [];
  autocompleteData: IAutocompleteData = {};
  constructor(
    private brandSandbox: BrandSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private companySandbox: CompanySandbox,
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
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        name: new FormControl(this.item.name),
        company: new FormControl(this.item.company ? this.item.company._id : undefined)
      });
      // 5. Si existe item una Empresa seleccionada la agrego a la lista del autocomplete
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
        name: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
      });
      // 7. Si quiero que el campo del autocomplete sea requerido
      this.autocompleteData.validations = [Validators.required];
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      this.companySandbox.fetchCompaniesList().subscribe((companies) => {
        this.companiesList = companies;
      }),
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
      this.brandSandbox.fetchIsLoadingBrand().subscribe((loading) => {
        this.loading = loading;
      })
    );
  }

  patchValue(option: any) {
    this.form.patchValue({
      company: option._id,
    });
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }

  buttonActionBrand() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.brandSandbox.updateBrand(this.form.value)
        : this.brandSandbox.saveBrand(this.form.value);
  }

  volver() {
    this.router.navigate(['/administration/brands/list']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
