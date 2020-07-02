import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteContactModalComponent } from 'client/app/app/pages/contacts/delete-contact-modal/delete-contact-modal.component';
import { ToastService } from '@mcy/core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { IToggleBindModal } from 'client/app/app/models';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-toggle-bind-modal',
	templateUrl: './toggle-bind-modal.component.html',
	styleUrls: ['./toggle-bind-modal.component.scss']
})
export class ToggleBindModalComponent implements OnDestroy {
	public linkedState: boolean = this.data.employee.linkedState === 'ACTIVO';
	public subscription = new Subscription();

	constructor(
		public dialogRef: MatDialogRef<DeleteContactModalComponent>,
		private toast: ToastService,
		private translateService: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: IToggleBindModal,
		private employeeService: EmployeeService,
	) {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onCancel() {
		this.data.onCancel();
		this.dialogRef.close();
	}

	onConfirm() {
		const employee = { ...this.data.employee };
		employee.linkedState = employee.linkedState === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
		this.subscription.add(
			this.employeeService.updateEmployee(employee).subscribe(success => {
				if (success) {
					this.makeToastMessage();
					this.toast.success(this.makeToastMessage());
					this.data.onConfirm();
					this.dialogRef.close();
				} else {
					this.toast.error(this.translateService.instant('pages.users.toggleBind.error'));
				}
			}, () => {
				this.toast.error(this.translateService.instant('pages.users.toggleBind.error'));
			})
		);
	}

	makeToastMessage(): string {
		return this.data.employee.user.name + ' ' + (this.linkedState
			? this.translateService.instant('pages.users.toggleBind.unbind.message')
			: this.translateService.instant('pages.users.toggleBind.bind.message')
		);
	}

	get role(): string {
		const role = this.data.employee.role;
		return this.translateService.instant(`pages.users.role.${role}`);
	}
}
