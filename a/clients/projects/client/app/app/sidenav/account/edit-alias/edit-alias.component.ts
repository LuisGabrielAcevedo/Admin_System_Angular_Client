import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IAccount, makeAccount, IAccountAliasRequest, makeAccountAliasRequest, IAccountAlias } from 'client/app/app/models';
import {
	FormBuilder,
	ValidatorFn,
	Validators,
	FormGroup
} from '@angular/forms';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { EditAliasConfirmComponent } from 'client/app/app/sidenav/account/edit-alias-confirm/edit-alias-confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { CONTRAINTS } from 'client/app/app/constants';
import { AccountService } from 'client/app/app/services/account.service';
import { Subscription } from 'rxjs';
import { IValidatorMessage } from '@mcy/main/components/input/input.component';

@Component({
	selector: 'mcy-edit-alias',
	templateUrl: './edit-alias.component.html',
	styleUrls: ['./edit-alias.component.scss']
})
export class EditAliasComponent implements OnInit, OnDestroy {
	@Input() data: IAccount = makeAccount({});
	public form: FormGroup;
	public aliasValidators: ValidatorFn[] = [];
	public subscription: Subscription = new Subscription();
	constructor(
		private fb: FormBuilder,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private accountService: AccountService
	) {
		this.form = this.fb.group({
			alias: ''
		});
	}

	ngOnInit() {
		this.form.patchValue(this.data);
		this.aliasValidators = [
			Validators.pattern(CONTRAINTS.CONTACT.ALIAS.PATTERN),
			Validators.required,
			Validators.minLength(CONTRAINTS.CONTACT.ALIAS.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.CONTACT.ALIAS.MAX_LENGTH),
			this.accountService.duplicateAliasValidator()
		];
	}

	get errorMessage():IValidatorMessage {
		const message =
		{
			pattern: this.translateService.instant('pages.accounts.editAlias.errorPattern'),
			duplicateAlias: this.translateService.instant('pages.accounts.editAlias.errorDuplicateAlias')
		};
		return message;
	}

	cancel() {
		this.sidenavService.close();
	}

	update() {
		const aliasRequest: IAccountAliasRequest = makeAccountAliasRequest({
			currentAlias: this.data.alias,
			newAlias: this.form.value.alias,
			cbvu: this.data.cbvu,
			cuilt: this.data.cuilt
		});
		this.subscription.add(this.accountService.changeAlias(aliasRequest).subscribe(res => {
				if(res.success){
					this.next(res.data);
				} else if(this.accountService.isDuplicatedAliasError(res)) {
					this.form.patchValue({ alias: this.form.value.alias });
				} else {
					this.sidenavService.onError (
						() =>	this.update(),
						{ message: this.translateService.instant('pages.accounts.editAlias.errorWithoutConexion') }
					)
				}
			})
		);
	}

	getAccountTypeTranslate() {
		return this.translateService.instant(`pages.accounts.type.${this.data.type}`);
	}

	next(aliasResponse: IAccountAlias) {
		this.sidenavService.nextStep({
			title: this.translateService.instant('pages.accounts.editAlias.title'),
			component: EditAliasConfirmComponent,
			data: {
				account : this.data,
				aliasResponse
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
