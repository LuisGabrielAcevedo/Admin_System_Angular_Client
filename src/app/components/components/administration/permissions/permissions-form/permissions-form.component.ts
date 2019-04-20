import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplication } from 'src/app/inferfaces/application';
import { IPermission } from 'src/app/inferfaces/permission';
import { PermissionSandbox } from 'src/app/sandbox/permission.sandbox';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';


@Component({
  selector: 'app-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.css']
})
export class PermissionsFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  forma: FormGroup;
  item: IPermission;
  loading: boolean;
  applicationsList: IApplication[] = [];
  constructor(
    private permissionSandbox: PermissionSandbox,
    private applicationSandbox: ApplicationSandbox,
    private snackBarSandbox: SnackbarSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const item = params['item'];
      if (item) {
        this.item = JSON.parse(item);
      }

      if (this.item) {
        this.forma = new FormGroup({
          _id: new FormControl(this.item._id),
          name: new FormControl(this.item.name),
          description: new FormControl(this.item.description),
          applications: new FormControl(this.item.applications),
          pinCodeRequired: new FormControl(this.item.pinCodeRequired),
          module: new FormControl({ value: this.item.module, disabled: true })
        });
      } else {
        this.forma = new FormGroup({
          name: new FormControl(''),
          description: new FormControl(''),
          pinCodeRequired: new FormControl(false),
          applications: new FormControl([]),
          module: new FormControl('')
        });
      }
    });
  }

  ngOnInit() {
    this.applicationSandbox.loadApplicationsList({});
    this.subscriptions.push(
      this.permissionSandbox.fetchIsLoadingPermission().subscribe((loading) => {
        this.loading = loading;
      }),
      this.applicationSandbox.fetchApplicationsList().subscribe((applications) => {
        this.applicationsList = applications;
      })
    );
  }

  volver() {
    this.router.navigate(['/administration/permissions/list']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  buttonActionPermission() {
    this.forma.status === 'INVALID'
      ? this.snackBarSandbox.sendMessage({ message: 'Datos incompletos' })
      : this.item
        ? this.permissionSandbox.updatePermission(this.forma.value)
        : this.permissionSandbox.savePermission(this.forma.value);
  }

}
