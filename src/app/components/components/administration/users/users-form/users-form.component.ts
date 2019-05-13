import { IApplication } from 'src/app/inferfaces/application';
import { IUser } from 'src/app/inferfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { IAutocompleteData } from 'src/app/inferfaces/autocomplete';
import { IRole } from 'src/app/inferfaces/role';
import { UserService } from 'src/app/services/http/user.service';
import { CompanyService } from 'src/app/services/http/company.service';
import { ApplicationService } from 'src/app/services/http/application.service';
import { RoleService } from 'src/app/services/http/role.service';
import { ILoadRequest, IApiResponse } from 'src/app/inferfaces/loadRequest';


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  item: IUser;
  loadingForm: boolean;
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
    private userService: UserService,
    private roleService: RoleService,
    private companyService: CompanyService,
    private applicationService: ApplicationService,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadingForm = true;
    this.route.paramMap.subscribe(params => {
      const id : string = params.get("id");
      id ? this.findUser(id) : this.loadForm();
    });
  }

  findUser(id: string) {
    this.userService.getUser(id).subscribe(resp => {
      this.item = resp.data;
      this.loadForm();
    })
  }

  loadForm() {
    if (this.item) {
      this.autocompleteData.placeholder = 'Empresa';
      this.image = this.item.profileImage ? this.item.profileImage.url : null;
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
      this.autocompleteData.defaultOption = this.item.company;
      this.autocompleteData.disabled = this.item.company ? true : false;
      this.loadApplications({});
      if (this.item.company) {
        this.loadRoles({
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
    this.loadingForm = false;
  }

  ngOnInit() {
  }

  setFile(file: File) {
    this.file = file;
  }

  buttonActionUser() {
    this.form.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.action('UPDATE')
        : this.action('SAVE')
  }

  action(action: string) {
    this.loading = true;
    action === 'UPDATE'
    ? this.userService.updateUser(this.form.value, this.file).subscribe(
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

  volver() {
    this.router.navigate(['/administration/users/list']);
  }

  searchValues(value: string) {
    this.loadCompanies({
      search: value
    });
  }

  patchValue(option: any) {
    this.form.patchValue({
      company: option._id,
      application: option.application._id
    });
    this.loadApplications({});
    this.loadRoles({
      filters: {
        company: option._id
      }
    });
  }

  loadRoles(loadRequestData: ILoadRequest) {
    this.roleService.getRolesList(loadRequestData).subscribe(roles => {
      this.rolesList = roles.data;
    })
  }

  loadCompanies(loadRequestData: ILoadRequest) {
    this.loadingCompanies = true;
    this.companyService.getCompaniesList(loadRequestData).subscribe(companies => {
      this.companiesList = companies.data;
      this.loadingCompanies = false;
    })
  }

  loadApplications(loadRequestData: ILoadRequest) {
    this.applicationService.getApplicationsList(loadRequestData).subscribe(applications => {
      this.applicationsList = applications.data;
    })
  }
}
