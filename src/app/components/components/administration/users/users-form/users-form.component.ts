import { IApplication } from 'src/app/inferfaces/application';
import { IUser } from 'src/app/inferfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSandbox } from 'src/app/sandbox/user.sandbox';
import { RoleSandbox } from 'src/app/sandbox/role.sandbox';
import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { TableOutputItemData } from 'src/app/components/sharedComponents/table/table.interfaces';
import { IRole } from 'src/app/inferfaces/role';


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  [x: string]: any;
  subscriptions: Subscription[] = [];
  form: FormGroup;
  item: IUser;
  loading: boolean;
  loadingCompanies: Boolean = false;
  file: File;
  applicationsList: IApplication[] = [];
  rolesList: IRole[] = [];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  autocompleteData: IAutocompleteData = {};
  companiesList: any[] = [];
  image: string = null;

  constructor(
    private userSandbox: UserSandbox,
    private roleSandbox: RoleSandbox,
    private companySandbox: CompanySandbox,
    private applicationSandbox: ApplicationSandbox,
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
      // 3. Imagen
      this.image = this.item.profileImage ? this.item.profileImage.url : null;
      // 4. Si existe item lleno el formunario con la data de item
      this.form = new FormGroup({
        _id: new FormControl(this.item._id),
        email: new FormControl(this.item.email),
        userName: new FormControl(this.item.userName),
        firstName: new FormControl(this.item.firstName),
        lastName: new FormControl(this.item.lastName),
        role: new FormControl(this.item.role ? this.item.role._id : undefined),
        company: new FormControl(this.item.company ? this.item.company._id : null),
        application: new FormControl({
          value: this.item.application ? this.item.application._id : undefined,
          disabled: this.item.application ? true : false
        })
      });
      // 5. Si existe item lleno el autocomplete de companies con la data en item
      this.autocompleteData.defaultOption = this.item.company;
      this.autocompleteData.disable = this.item.company ? true : false;
      if (this.item.company) {
        this.roleSandbox.loadRolesList({
          filters: {
            company: this.item.company._id
          }
        });
      }
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        userName: new FormControl(''),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        role: new FormControl(null),
        company: new FormControl(null),
        application: new FormControl(null)
      });
    }
  }

  ngOnInit() {
    this.applicationSandbox.loadApplicationsList({});

    this.subscriptions.push(
      // circulo cargando loading al oprimir guardar o actualizar
      this.userSandbox.fetchIsLoadingUsers().subscribe((loading) => {
        this.loading = loading;
      }),

      // cargamos la lista de compañias para el selector
      this.companySandbox.fetchCompaniesList().subscribe(companies => {
        this.companiesList = companies;
      }),

      // cargamos la lista de aplicaciones para el selector
      this.applicationSandbox.fetchApplicationsList().subscribe(applications => {
        this.applicationsList = applications;
      }),

      this.companySandbox.fetchIsLoadingCompanies().subscribe((loading) => {
        this.loadingCompanies = loading;
      }),

      // cargamos la lista de Roles para el selector
      this.roleSandbox.fetchRolesList().subscribe(roles => {
        this.rolesList = roles;
      })
    );
  }

  setFile(file: File) {
    this.file = file;
  }

  buttonActionUser() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.userSandbox.updateUser(this.form.value, this.file)
        : this.userSandbox.saveUser(this.form.value);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  volver() {
    this.router.navigate(['/administration/users/list']);
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.adminSandbox.deleteAdmin(data.item);
    }
  }

  searchValues(value: string) {
    this.companySandbox.loadCompaniesList({
      search: value
    });
  }

  patchValue(option: any) {
    this.form.patchValue({
      company: option._id,
      application: option.application._id
    });

    this.roleSandbox.loadRolesList({
      filters: {
        company: option._id
      }
    });
  }
}
