import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DeleteContactModalComponent } from './delete-contact-modal.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeDeleteContactModal } from '../../../models';

describe('ConfirmationModal', () => {
	let component: DeleteContactModalComponent;
	let fixture: ComponentFixture<DeleteContactModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DeleteContactModalComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ 
				CoreModule,
				TranslateModule.forRoot() 
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: makeDeleteContactModal({})}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeleteContactModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
