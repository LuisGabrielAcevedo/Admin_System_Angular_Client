import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { AccountDetailComponent } from './account-detail.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeAccount } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('AccountDetailComponent', () => {
	let component: AccountDetailComponent;
	let fixture: ComponentFixture<AccountDetailComponent>;
	let sidenavService: SidenavService;
	let utilsService: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountDetailComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountDetailComponent);
		sidenavService = TestBed.get(SidenavService);
		utilsService = TestBed.get(UtilsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('the function copyToClipboard in utilsService should be called', () => {
		spyOn(utilsService, 'copyToClipboard');
		component.copyToClipboard(makeAccount({}));
		expect(utilsService.copyToClipboard).toHaveBeenCalled();
	});

	it('the function open in sidenavService should be called', () => {
		spyOn(sidenavService, 'open');
		component.openEditAlias();
		expect(sidenavService.open).toHaveBeenCalled();
	});
});
