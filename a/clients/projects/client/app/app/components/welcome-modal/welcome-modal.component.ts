import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IWelcomeModal } from 'client/app/app/models/modal';
import { UserService } from 'client/app/app/services/user.service';
import { Subscription } from 'rxjs';
import { IUserState, makeUserState } from 'client/app/app/models';


@Component({
	selector: 'mcy-welcome-modal',
	templateUrl: './welcome-modal.component.html',
	styleUrls: ['./welcome-modal.component.scss'],
})
export class WelcomeModalComponent implements OnDestroy, OnInit {
	
	public subscription: Subscription;
	public isOnboarding: boolean = false;
	public userState: IUserState = makeUserState({});

	constructor(
		public dialogRef: MatDialogRef<WelcomeModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IWelcomeModal,
		private userService: UserService
	) { 
		this.subscription = new Subscription();

		this.isOnboarding = this.data.showOnboarding;
	}

	ngOnInit(): void {
		this.subscription.add(
			this.userService.getUserState().subscribe((userState) => {
				this.userState = userState
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onConfirm() {
		if( !this.data.showOnboarding ) {		
			this.subscription.add(
				this.userService.updateSignedPages(this.data.pageId, this.data.versionId, this.data.userId).subscribe(() => {
					this.data.onConfirm();
					this.dialogRef.close();
				})
			);
		} else {
			this.dialogRef.close();
		}
	}

	onExitFlow(){
		this.onConfirm();
	}

	get getfullName() {
		return `${this.userState.user.firstName} ${this.userState.user.lastName}`;
	}

}
