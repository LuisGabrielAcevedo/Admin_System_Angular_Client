import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { BindUserFormComponent } from 'client/app/app/sidenav/bind-user/bind-user-form/bind-user-form.component';
import { makeSidenavClose } from 'client/app/app/models';
import { ModalService } from '@mcy/core/services/modal.service';
import { ToggleBindModalComponent } from 'client/app/app/modules/users/components/toggle-bind-modal/toggle-bind-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatButtonToggleGroup, MatButtonToggleChange, MatButtonToggle } from '@angular/material';
import { ROLES, USER_PERMISSIONS } from 'client/app/app/constants';
import { IEmployee, IEmployeesState, makeEmployeesState } from 'client/app/app/models/employee';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { makeToggleBindModal } from 'client/app/app/models';
import { ToastService } from '@mcy/core/services/toast.service';
import { Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	templateUrl: './landing.page.html',
	styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit, OnDestroy {
	public itemsPaginatorLength: number = 7;
	public userListTableSource = new MatTableDataSource<IEmployee>([]);
	public roles = ROLES;
	public subscription: Subscription;
	public linkedState = {
		active: 'ACTIVO',
		pendingApproval: 'PENDIENTE_ACTIVACION',
		inactive: 'INACTIVO'
	}
	public itemsDisplayed: number = this.itemsPaginatorLength;
	public isUsersListEmpty: boolean = true;
	public employeeState: IEmployeesState = makeEmployeesState({});
	public displayedColumns: string[] = [
		'name',
		'document',
		'status',
		'role',
		'actions',
	];

	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private employeeService: EmployeeService,
		private modalService: ModalService,
		private toastService: ToastService,
		private userService: UserService
	) {
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.subscription.add(
			this.employeeService.getEmployeesState().subscribe(state => {
				this.employeeState = state;
				this.userListTableSource.data = this.employeeState.employees.slice(0, this.itemsDisplayed);
				this.isUsersListEmpty = this.employeeState.employees.length <= 0;
				if (!this.employeeState.searchedEmployee && !this.employeeState.loading) {
					this.employeeService.findEmployees();
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	bindUser() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.bindUser.title'),
			component: BindUserFormComponent,
			data: {
			},
			hasMoreData: true,
			closeAction: makeSidenavClose({
				text: this.translateService.instant(
					'sidenav.bindUser.closeMessage'
				),
				cancelText: this.translateService.instant('sidenav.bindUser.cancel'),
				confirmText: this.translateService.instant('sidenav.bindUser.discard')
			})
		})
	}

	toggleLinkUserClick(employee: IEmployee) {
		this.modalService.openDialog(makeToggleBindModal({
			component: ToggleBindModalComponent,
			employee
		}));
	}

	showMoreUsers() {
		this.itemsDisplayed = this.itemsDisplayed + this.itemsPaginatorLength;
		this.userListTableSource.data = this.employeeState.employees.slice(0, this.itemsDisplayed);
	}

	onButtonToggleChange(event: MatButtonToggleChange, employee: IEmployee): void {
		if (!this.employeeState.loadingUpdateEmployee) {
			const buttonToggle = event.source;
			const buttonToggleGroup = buttonToggle.buttonToggleGroup;
			const modifiedEmployee: IEmployee = {
				...employee,
				role: event.value
			};
			this.updateToggleGroupState(buttonToggleGroup, employee);
			if(employee.role !== modifiedEmployee.role) {
				this.subscription.add(
					this.employeeService.updateEmployee(modifiedEmployee).subscribe((isSuccess) => {
						if (isSuccess) {
							this.updateToggleGroupState(buttonToggleGroup, modifiedEmployee);
							this.toastService.success(this.makeToastMessage(modifiedEmployee.user.name, modifiedEmployee.role));
						} else {
							this.updateToggleGroupState(buttonToggleGroup, employee);
							this.toastService.error(this.translateService.instant('pages.users.landing.error'));
						}
						
					})
				);
			}
		}
	}

	updateToggleGroupState(buttonToggleGroup: MatButtonToggleGroup, employee: IEmployee) {
		buttonToggleGroup._buttonToggles.forEach((matToggle: MatButtonToggle) => {
			matToggle.checked = employee.role === matToggle.value;
		});
	}

	makeToastMessage(employeeName: string, role: string): string {
		const roleLabel: string = this.translateService.instant(`pages.users.role.${role}`);
		return this.translateService.instant('pages.users.landing.roleChanged', {
			role: roleLabel,
			name: employeeName
		});
	}

	get hasSuperAdminWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.ADMIN);
	}

}
