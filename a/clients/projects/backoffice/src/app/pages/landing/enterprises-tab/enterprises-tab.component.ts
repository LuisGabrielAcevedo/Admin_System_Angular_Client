import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CONSTRAINTS } from 'backoffice/src/app/constants';
import { UserService } from 'backoffice/src/app/services/user.service';
import { IUserState, makeUserState } from 'backoffice/src/app/models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-landing-enterprise-tab',
	templateUrl: './enterprises-tab.component.html',
	styleUrls: ['./enterprises-tab.component.scss']
})
export class LandingEnterpriseTabComponent implements OnInit, OnDestroy {
	public userState: IUserState = makeUserState({});
	public subscription = new Subscription();
	public form: FormGroup = new FormGroup({});

	public searchKeywordValidators: ValidatorFn[] = [
		Validators.required,
		Validators.pattern(CONSTRAINTS.CUIT.PATTERN),
		Validators.minLength(CONSTRAINTS.CUIT.MIN_LENGTH),
		Validators.maxLength(CONSTRAINTS.CUIT.MAX_LENGTH),
	];

	constructor(private userService: UserService, private router: Router) {
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
		}));
	}

	ngOnInit() {
		this.form = new FormGroup({
			searchKeyword: new FormControl('', this.searchKeywordValidators),
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.subscription.add(
			this.userService.findEnterprise(this.form.value.searchKeyword).subscribe(isSuccess => {
				if (isSuccess) {
					this.router.navigate(['enterpriseDetails']);
				}
			})
		);
	}

	get searchKeywordMaxLength(): number {
		return CONSTRAINTS.CUIT.MAX_LENGTH;
	}

}
