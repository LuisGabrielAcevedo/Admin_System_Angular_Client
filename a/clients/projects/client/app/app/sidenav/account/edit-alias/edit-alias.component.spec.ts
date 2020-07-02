import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditAliasComponent } from './edit-alias.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { makeAccount, makeAccountAliasRequest, makeAccountAlias } from 'client/app/app/models';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';

describe('EditAliasComponent', () => {
	let component: EditAliasComponent;
	let fixture: ComponentFixture<EditAliasComponent>;
	let sidenavService: SidenavService;
	let translateService: TranslateService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EditAliasComponent],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				BrowserAnimationsModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				TranslateService,
				FormBuilder
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditAliasComponent);
		sidenavService = TestBed.get(SidenavService);
		translateService = TestBed.get(TranslateService);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.ngOnInit();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when next is called, the function nextStep in the sidenavService is called', () => {
		spyOn(sidenavService, 'nextStep');
		component.next(makeAccountAlias({}));
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('when cancel is called, the function close in the sidenavService is called', () => {
		spyOn(sidenavService, 'close');
		component.cancel();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('', () => {
		spyOn(component.subscription, 'add');
		component.form.patchValue(makeAccountAliasRequest({}));
		component.data = makeAccount({});
		component.update();
		expect(component.subscription.add).toHaveBeenCalled();
	});

	it('when getAccountTypeTranslate is called, should call to translateService', () => {
		spyOn(translateService, 'instant');
		component.data = makeAccount({type: 'CC'});
		component.getAccountTypeTranslate();
		expect(translateService.instant).toHaveBeenCalledWith('pages.accounts.type.CC');
	});
});
