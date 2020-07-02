import { Component, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENTS, ROLES, USER_PERMISSIONS } from 'client/app/app/constants';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { CONTRAINTS } from 'client/app/app/constants';
import { TranslateService } from '@ngx-translate/core';
import { BindUserSuccessComponent } from 'client/app/app/sidenav/bind-user/bind-user-success/bind-user-success.component';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { IEmployeeBFF } from 'client/app/app/models/employee';
import { Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	selector: 'mcy-bind-user-form',
	templateUrl: './bind-user-form.component.html',
	styleUrls: ['./bind-user-form.component.scss']
})
export class BindUserFormComponent implements OnInit,OnDestroy {

	public documentTypesOptions: ISelectOption[] = [];
	public bindUserForm: FormGroup = new FormGroup({});
	public roles = ROLES;
	public documentTypeValidators = [
		Validators.required
	];

	public documentNumberValidators = [
		Validators.required,
		Validators.pattern(CONTRAINTS.DOCUMENTS.PATTERN)
	];
	public nameValidators = [
		Validators.required,
		Validators.pattern(CONTRAINTS.NAME.PATTERN)
	];
	public lastNameValidators = [
		Validators.required,
		Validators.pattern(CONTRAINTS.LASTNAME.PATTERN)
	];
	public emailValidators = [
		Validators.required,
		Validators.pattern(CONTRAINTS.EMAIL.PATTERN)
	];
	public roleTypeValidators = [
		Validators.required
	]
	private subscription: Subscription = new Subscription();

	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private employeeService: EmployeeService,
		private userService: UserService
 	) { }

	ngOnInit() {
		this.documentTypesOptions = this.documentTypes;
		this.bindUserForm = new FormGroup({
			documentType: new FormControl('', this.documentTypeValidators),
			documentNumber: new FormControl('', this.documentNumberValidators),
			name: new FormControl('', this.nameValidators),
			lastName: new FormControl('', this.lastNameValidators),
			email: new FormControl('', this.emailValidators),
			roleType: new FormControl('', this.roleTypeValidators)
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	get documentTypes(): ISelectOption[] {
		return DOCUMENTS.map((document) => {
			return {
				viewValue: document.documentType,
				value: document.code
			};
		});
	}

	startContinueProcess(){
		const userData = this.makeEmployeeBFFfromFormData();
		this.subscription.add(this.employeeService.postUserData(userData).subscribe((data)=>{
			if (data.success){
				this.employeeService.addEmployee(data.data);
				this.continue(data.data);
			}
		}))
	}

	continue(responseData: IEmployeeBFF){
		this.sidenavService.nextStep({
			title: this.translateService.instant('sidenav.bindUser.success.title'),
			component: BindUserSuccessComponent,
			data: {
				userData: responseData
			},
			hasMoreData: true
		})
	}

	cancel(){
		this.sidenavService.preClose();
	}

	makeEmployeeBFFfromFormData(): IEmployeeBFF {
		const docType = this.documentTypesOptions.find((ele) => ele.value === this.bindUserForm.value.documentType);
		return {
			id: '',
			documentNumber: this.bindUserForm.value.documentNumber,
			documentType: docType? docType.viewValue: '',
			email: this.bindUserForm.value.email,
			firstName: this.bindUserForm.value.name,
			lastName: this.bindUserForm.value.lastName,
			phone: '',
			username:'',
			linkedState: 'PENDIENTE_ACTIVACION',
			role: this.bindUserForm.value.roleType
		}
	}

	get hasAdminPermissions(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.ADMIN);
	}
}
