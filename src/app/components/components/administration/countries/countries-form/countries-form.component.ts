import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from 'src/app/inferfaces/country';
import { CountrySandbox } from 'src/app/sandbox/country.sandbox';

@Component({
  selector: 'app-countries-form',
  templateUrl: './countries-form.component.html',
  styleUrls: ['./countries-form.component.css']
})
export class CountriesFormComponent implements OnInit {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: ICountry;
  loading: boolean; // circulo cargando
  loadingCountry: Boolean = false;
  constructor(
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
  // 3. Si existe item lleno el formunario con la data de item
  this.form = new FormGroup({
    _id: new FormControl(this.item._id),
    name: new FormControl(this.item.name),
    nameInitials: new FormControl(this.item.nameInitials),
    capital: new FormControl(this.item.capital),
    language: new FormControl(this.item.language),
    currency: new FormControl(this.item.currency),
  });

   } else {
    // 6. Si no existe item el formulario esta vacio
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nameInitials: new FormControl('', [Validators.required]),
      capital: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });

  }


}




  ngOnInit() {

      this.subscriptions.push(
        // circulo cargando loading al oprimir guardar o actualizar
      this.countrySandbox.fetchIsLoadingCountries().subscribe((loading) => {
        this.loading = loading;
      }),

      this.countrySandbox.fetchIsLoadingCountry().subscribe((loading) => {
        this.loading = loading;
      })
    );




  }

  volver() {
    this.router.navigate(['/administration/countries/list']);
  }

  buttonActionCountry() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.countrySandbox.updateCountry(this.form.value)
        : this.countrySandbox.saveCountry(this.form.value);
  }

 }
