import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-update-password-success',
	templateUrl: './update-password-success.component.html',
	styleUrls: ['./update-password-success.component.scss']
})
export class UpdatePasswordSuccessComponent implements OnInit {

	constructor(
		private router: Router
		) { }

	ngOnInit() {
	}

	redirectToLogin(){
		return this.router.navigate(['/login']);
	}

}
