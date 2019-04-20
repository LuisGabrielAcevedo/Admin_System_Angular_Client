import { RoleSandbox } from 'src/app/sandbox/role.sandbox';
import { IApplication } from 'src/app/inferfaces/application';
import { Component, OnInit } from '@angular/core';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { IRole } from 'src/app/inferfaces/role';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalSandbox } from 'src/app/sandbox/local.sandbox';
import { PermissionSandbox } from 'src/app/sandbox/permission.sandbox';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { IPermission } from 'src/app/inferfaces/permission';
import { ILocal } from 'src/app/inferfaces/local';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: IRole;
  loading: boolean;
  loadingCompanies: Boolean = false;
  companiesList: any[] = [];
  applicationsList: IApplication[] = [];
  permissionsList: IPermission[] = [];
  localsList: ILocal[] = [];
  autocompleteData: IAutocompleteData = {};
  loadingRoles: boolean;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  constructor(
    private roleSandbox: RoleSandbox,
    private localSandbox: LocalSandbox,
    private permissionSandbox: PermissionSandbox,
    private applicationSandbox: ApplicationSandbox,
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
      // 3. Si existe item lleno el formunario con la data de item
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        name: new FormControl(this.item.name),
        description: new FormControl(this.item.description),
        company: new FormControl(this.item.company ? this.item.company._id : undefined),
        application: new FormControl(this.item.company ? this.item.application._id : undefined),
        permissions: new FormControl(this.item.company ? this.item.permissions : undefined),
        locals: new FormControl(this.item.company ? this.item.locals : undefined)
      });
      // 4. Si existe item lleno el autocomplete de companies con la data en item
      this.autocompleteData.defaultOption = this.item.company;
      if (this.item.company) {
        this.companiesList.push({
          _id: this.item.company,
          name: this.item.company.name,
          profileImage: this.item.company.profileImage
        });
      }
    } else {
      this.form = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        company: new FormControl(''),
        application: new FormControl(''),
        permissions: new FormControl([]),
        locals: new FormControl([]),
      });
    }
  }

  ngOnInit() {
    this.applicationSandbox.loadApplicationsList({});
    if (this.item) {
      this.localSandbox.loadLocalsList({
        filters: {
          company: this.item.company._id
        }
      });
      this.permissionSandbox.loadPermissionsList({
        filters: {
          applications: this.item.application._id
        }
      });
    }
    this.subscriptions.push(
      // circulo cargando loading al oprimir guardar o actualizar
      this.roleSandbox.fetchIsLoadingRole().subscribe((loading) => {
        this.loading = loading;
      }),
      // cargamos la lista de aplicacion para el autocomplete
      this.localSandbox.fetchLocalsList().subscribe(locals => {
        this.localsList = locals;
      }),
      // cargamos la lista de aplicacion para el selector multiple
      this.permissionSandbox.fetchPermissionsList().subscribe((permissions) => {
        this.permissionsList = permissions;
      }),
      // cargamos la lista de aplicacion para el selector
      this.companySandbox.fetchCompaniesList().subscribe(companies => {
        this.companiesList = companies;
      }),
      // cargamos loading para el buscador de compañias
      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),
      this.applicationSandbox.fetchApplicationsList().subscribe(applications => {
        this.applicationsList = applications;
      })
    );
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  buttonActionRole() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.roleSandbox.updateRole(this.form.value)
        : this.roleSandbox.saveRole(this.form.value);
  }


  patchValue(option: any) {
    this.form.patchValue({
      company: option._id,
      application: option.application._id
    });
    this.localSandbox.loadLocalsList({
      filters: {
        company: option._id
      }
    });
    this.permissionSandbox.loadPermissionsList({
      filters: {
        applications: option.application._id
      }
    });
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({ search: value });
  }

  volver() {
    this.router.navigate(['/administration/roles/list']);
  }
}

