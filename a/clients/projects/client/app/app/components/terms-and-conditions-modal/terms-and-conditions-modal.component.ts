import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITermsAndConditionsModal } from 'client/app/app/models/modal';
import { Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { AuthService } from 'client/app/app/services/auth.service';
import { IUserState, makeUserState } from 'client/app/app/models/user';

@Component({
	selector: 'mcy-terms-and-conditions-modal',
	templateUrl: './terms-and-conditions-modal.component.html',
	styleUrls: ['./terms-and-conditions-modal.component.scss']
})
export class TermsAndConditionsModalComponent implements OnDestroy, OnInit {

	public subscription: Subscription;
	public userState: IUserState = makeUserState({});

	constructor(
		public dialogRef: MatDialogRef<TermsAndConditionsModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ITermsAndConditionsModal,
		private userService: UserService,
		private authService: AuthService
	) { 
		this.subscription = new Subscription();
	}
	
	ngOnInit(): void {
		this.subscription.add(
			this.userService.getUserState().subscribe((userState) => {
				this.userState = userState;
			})
		);		
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onCancel() {
		this.authService.logout();
		this.dialogRef.close();
	}

	onConfirm() {
		this.subscription.add(
			this.userService.updateSignedPages(this.data.pageId, this.data.versionId, this.getUserID).subscribe(() => {
				this.data.onConfirm();
				this.dialogRef.close();
			})
		);
	}

	get getUserID() {
		return this.userState.user.id;
	}

	onHtmlRender(){
		const element = document.getElementById('terms-and-conditions-modal__content');
		if (element) {
			element.classList.add('terms-and-conditions-modal__loaded');
		}
	}

}
