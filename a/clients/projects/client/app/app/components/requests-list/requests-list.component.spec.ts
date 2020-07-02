import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RequestsListComponent } from './requests-list.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { SignaturesServiceMock } from 'client/app/app/services/signatures.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('RequestsListComponent', () => {
	let component: RequestsListComponent;
	let fixture: ComponentFixture<RequestsListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: SignaturesService, useClass: SignaturesServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it ('should return requests-list__state--partially-authorized',()=>{
		const classState = 'requests-list__state' + component.getColorClassByState('PARTIALLY_AUTHORIZED');
		expect(classState).toEqual('requests-list__state--partially-authorized');
	});

	it ('should return requests-list__state--pending-approval',()=>{
		const classState = 'requests-list__state' + component.getColorClassByState('PENDING_APPROVAL');
		expect(classState).toEqual('requests-list__state--pending-approval');
	});
});
