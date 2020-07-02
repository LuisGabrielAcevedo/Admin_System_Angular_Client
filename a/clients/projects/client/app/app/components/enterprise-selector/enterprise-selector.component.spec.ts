import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseSelectorComponent } from './enterprise-selector.component';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { makeEnterprise, IEnterprise, makeEnterpriseState } from 'client/app/app/models';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { BehaviorSubject, of } from 'rxjs';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';

describe('EnterpriseSelectorComponent', () => {
	let component: EnterpriseSelectorComponent;
	let fixture: ComponentFixture<EnterpriseSelectorComponent>;
	let userService: UserService;
	const enterprise: IEnterprise = makeEnterprise({});
	const event: Event = new Event('');
	let toastService: ToastService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EnterpriseSelectorComponent ],
			imports: [
				CoreModule.forRoot(),
				BrowserAnimationsModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterpriseSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		userService = TestBed.get(UserService);
		toastService = TestBed.get(ToastService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should find enterprises', () => {
		spyOn(userService, 'getEnterpriseState').and.returnValue(new BehaviorSubject(makeEnterpriseState({ searchedEnterprises: false })))
		spyOn(userService, 'findEnterprise');
		component.ngOnInit();
		expect(userService.findEnterprise).toHaveBeenCalled();
		expect(userService.getEnterpriseState).toHaveBeenCalled();
	});

	it('should not find enterprises', () => {
		spyOn(userService, 'getEnterpriseState').and.returnValue(new BehaviorSubject(makeEnterpriseState({ searchedEnterprises: true })))
		spyOn(userService, 'findEnterprise');
		component.ngOnInit();
		expect(userService.findEnterprise).not.toHaveBeenCalled();
		expect(userService.getEnterpriseState).toHaveBeenCalled();
	});

	it('should show more enterpises', async(() => {
		component.showMoreEnterprises();
		expect(component.itemsDisplayed).toBe(ITEMS_PER_PAGE + ITEMS_PER_PAGE);
	}));

	it('should search the enterprises by the name value', async(() => {
		component.enterpriseState.enterprises = [makeEnterprise({})];
		spyOn(component.enterpriseState.enterprises, 'filter').and.returnValue([makeEnterprise({name: 'test'})]);
		component.onSearch('test');
		expect(component.enterpriseState.enterprises.filter).toHaveBeenCalled();
	}));

	it('should search the enterprises by the cuilt value', async(() => {
		component.enterpriseState.enterprises = [makeEnterprise({ cuilt: '12345' })];
		component.onSearch('12345');
		expect(component.enterpriseListTableSource).toBeTruthy();
	}));

	it('should update Enterprise default', async(() => {
		spyOn(userService, 'updateEnterpriseDefault').and.returnValue(of(true));
		spyOn(toastService, 'message');
		component.onFavoriteClick(enterprise, event);
		expect(userService.updateEnterpriseDefault).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalled();
	}));

	it('should update Enterprise default failed', async(() => {
		spyOn(userService, 'updateEnterpriseDefault').and.returnValue(of(false));
		spyOn(toastService, 'error');
		component.onFavoriteClick(enterprise, event);
		expect(userService.updateEnterpriseDefault).toHaveBeenCalled();
		expect(toastService.error).toHaveBeenCalled();
	}));
});
