import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	templateUrl: './signup-error.page.html',
	styleUrls: ['./signup-error.page.scss']
})
export class SignupErrorPage {

	constructor(
		private router: Router,
	) { }

	redirectToPreviousStep() {
		this.router.navigate(['/signup']);
	}

	redirectToLogin() {
		this.router.navigate(['/']);
	}

}
