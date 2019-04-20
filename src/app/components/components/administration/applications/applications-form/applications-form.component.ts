import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { IApplication } from 'src/app/inferfaces/application';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applications-form',
  templateUrl: './applications-form.component.html',
  styleUrls: ['./applications-form.component.css']
})
export class ApplicationsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: IApplication;
  loading: boolean;
  constructor(
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private applicationSandbox: ApplicationSandbox,
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
        description: new FormControl(this.item.description),
        code: new FormControl(this.item.code)
      });
    } else {
      // 6. Si no existe item el formulario esta vacio
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        code: new FormControl(''),
        description: new FormControl('')
      });
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      // circulo cargando loading al oprimir guardar o actualizar
      this.applicationSandbox.fetchIsLoadingApplication().subscribe(loading => {
        this.loading = loading;
      }),
    );

  }

  buttonActionApplication() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.applicationSandbox.updateApplication(this.form.value)
        : this.applicationSandbox.saveApplication(this.form.value);
  }

  volver() {
    this.router.navigate(['/administration/applications/list']);
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
