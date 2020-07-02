import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { ToastService } from '@mcy/core/services/toast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { XHRService } from '@mcy/main/services/xhr.service';

@Component({
	templateUrl: './playground.page.html',
	styleUrls: ['./playground.page.scss']
})
export class PlaygroundPage implements OnInit {
	dataXHR: Observable<any>;
	contacts: Observable<any>;
	contactList: any;
	value: number;
	min = 25;
	max = 150;
	toastRef: any;
	testSoftTokenForm: FormGroup;
	constructor(
		private data: DataService,
		private xhr: XHRService,
		private toast: ToastService,
		private fb: FormBuilder
	) {
		this.value = this.min;
		this.dataXHR = this.xhr.get('https://jsonplaceholder.typicode.com/todos/1');

		this.contacts = this.data.get('v1/payment-contacts/contacts');
		this.testSoftTokenForm = this.fb.group({
			name: [
				'',
				Validators.compose([Validators.required, Validators.minLength(3)])
			],
			lastName: [
				'',
				Validators.compose([Validators.required, Validators.minLength(3)])
			],
			softToken: '',
			inputField: ''
		});
	}

	dismiss() {
		if (this.toastRef) {
			this.toastRef.dismiss();
		}
	}
	dismissWithAction() {
		if (this.toastRef) {
			this.toastRef!.dismissWithAction();
		}
	}

	openToast() {
		this.toastRef = this.toast.message('ejemplo de "toast" message');

		this.toastRef.afterOpened.subscribe(() => {
			console.log('ejemplo toast afterOpened');
		});
		this.toastRef.onAction.subscribe(() => {
			console.log('ejemplo toast onAction');
		});
		this.toastRef.afterDismissed.subscribe(() => {
			console.log('ejemplo toast afterDismissed');
		});
	}

	ngOnInit(): void {
		this.contacts.subscribe(
			data => {
				this.contactList = data;
			},
			error => {
				console.log(error);
			}
		);

		this.testSoftTokenForm.get('softToken')!.valueChanges.subscribe(val => {
			console.log('SOFTTOKEN EN PADRE ', val);
		});
	}
	onSubmit() {
		console.log('data: ', this.testSoftTokenForm.value);
	}
}
