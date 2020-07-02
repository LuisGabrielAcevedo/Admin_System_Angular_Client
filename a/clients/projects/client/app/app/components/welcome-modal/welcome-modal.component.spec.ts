import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeModalComponent } from './welcome-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@angular/flex-layout';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeWelcomeModal } from 'client/app/app/models/modal';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { Observable, of } from 'rxjs';

describe('WelcomeModalComponent', () => {
	let component: WelcomeModalComponent;
	let fixture: ComponentFixture<WelcomeModalComponent>;
	let userService: UserService;
	const dialogMock = {
		close: () => { }
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				CoreModule
			],
			declarations: [ WelcomeModalComponent ],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeWelcomeModal({})},
				{ provide: UserService, useClass: UserServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeModalComponent);
		component = fixture.componentInstance;
		userService = TestBed.get(UserService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should unsubscribe when the component is destroyed', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should update the signed status of welcome', () => {
		spyOn(component.subscription, 'add');
		spyOn(userService, 'updateSignedPages').and.returnValue(new Observable());
		component.onConfirm();
		expect(userService.updateSignedPages).toHaveBeenCalled();
	});

	it('should call the confirm method from the data passed and should close the modal', () => {
		spyOn(component.subscription, 'add');
		spyOn(userService, 'updateSignedPages').and.returnValue(of(true));
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.data.onConfirm).toHaveBeenCalled();
	});
});
