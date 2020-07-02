import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCheckbooksNewComponent } from './request-checkbooks-new.component';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { AccountService } from 'client/app/app/services/account.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CheckbooksService } from 'client/app/app/services/checkbooks.service';
import { CheckbooksServiceMock } from 'client/app/app/services/checkbooks.service.mock';
import { CheckbooksTypesService } from 'client/app/app/services/checkbooks-types.service';
import { CheckbooksTypesServiceMock } from 'client/app/app/services/checkbooks-types.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { BehaviorSubject, of } from 'rxjs';
import { makeTypesOfCheckbookState, makeProvince, makeCheckbookTypeInfo, makeBranch} from 'client/app/app/models/checkbook';
import { makeAccountState, makeAccount, makeCurrency } from 'client/app/app/models';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { makeRequest, IRequestResponse } from 'client/app/app/models';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';

describe('RequestCheckbooksNewComponent', () => {
	let component: RequestCheckbooksNewComponent;
	let fixture: ComponentFixture<RequestCheckbooksNewComponent>;
	let checkbooksTypesService: CheckbooksTypesService
	let accountService : AccountService;
	let sidenavService: SidenavService;
	let checkbooksService: CheckbooksService;

	const typesOfCheckbookState = makeTypesOfCheckbookState({
		typesOfCheckbooks: [
			makeCheckbookTypeInfo({
				type: 'CHECKBOOK_39',
				description:'TEST',
				code: '0001',
				deferred: 'S'})],
		provinces:[makeProvince({
			id:'0001',
			description: 'province-test',
			branchOffices: [makeBranch({
				id: '0001',
				description: 'branch-test'
			})]
		})]
	});

	const typesOfCheckbookStateFalse = makeTypesOfCheckbookState({
		typesOfCheckbooks: [],
		provinces:[makeProvince({
			id:'0001',
			description: 'province-test',
			branchOffices: [makeBranch({
				id: '0001',
				description: 'branch-test'
			})]
		})]
	});

	const request: IRequestResponse = {
		data: makeRequest({}),
		status: [
			{
				code : 'WIREMOCK:000',
				message : 'Operation successfully.',
				traceId : 'BFF-ACC:1581965136670'
			}
		],
		success: true
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RequestCheckbooksNewComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [MatSelectModule ,TranslateModule.forRoot(), CoreModule.forRoot(),
				ReactiveFormsModule,FormsModule, BrowserAnimationsModule],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: CheckbooksService, useClass: CheckbooksServiceMock },
				{ provide: CheckbooksTypesService, useClass: CheckbooksTypesServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock },
				FormBuilder	]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestCheckbooksNewComponent);
		checkbooksTypesService = TestBed.get(CheckbooksTypesService);
		accountService = TestBed.get(AccountService);
		sidenavService = TestBed.get(SidenavService);
		checkbooksService = TestBed.get(CheckbooksService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getTypesOfCheckbookState', () => {
		spyOn(checkbooksTypesService, 'getTypesOfCheckbookState').and.returnValue(
			new BehaviorSubject(typesOfCheckbookState)
		);
		spyOn(component, 'getTypeCheckbooksList');
		spyOn(component, 'getProvincesList');
		spyOn(component.subscription, 'add');
		component.typesOfCheckbooks = [makeCheckbookTypeInfo({
			type: 'CHECKBOOK_39',
			description:'CHECKBOOK 39'
		})];
		component.loadCheckbooksTypes();
		expect(component.subscription.add).toHaveBeenCalled();
		expect(checkbooksTypesService.getTypesOfCheckbookState).toHaveBeenCalled();
		expect(component.getTypeCheckbooksList).toHaveBeenCalled();
		expect(component.getProvincesList).toHaveBeenCalled();

	});


	it('should call findTypesOfCheckbooks', () => {
		spyOn(component.subscription, 'add');
		spyOn(checkbooksTypesService, 'getTypesOfCheckbookState').and.returnValue(
			new BehaviorSubject(typesOfCheckbookStateFalse)
		);
		spyOn(checkbooksTypesService, 'findTypesOfCheckbooks');
		component.typesOfCheckbooks = [makeCheckbookTypeInfo({
			type: 'CHECKBOOK_39',
			description:'CHECKBOOK 39'
		})];
		component.loadCheckbooksTypes();
		expect(component.subscription.add).toHaveBeenCalled();
		expect(checkbooksTypesService.findTypesOfCheckbooks).toHaveBeenCalled();
	});

	it('should call getAccountState', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({})));
		component.loadAccounts();
		expect(accountService.getAccountState).toHaveBeenCalled();
	});


	it('should call getBranchesList', () => {
		spyOn(component, 'getBranchesList');
		component.requestCheckbooksForm.value.province ='0001';
		component.provinces = typesOfCheckbookState.provinces;
		component.onProvinceChange();
		expect(component.getBranchesList).toHaveBeenCalled();
	});

	it('function should return list branches whit format wanted', () => {
		component.getBranchesListOptions(typesOfCheckbookState.provinces[0]);
		const branchSpy: ISelectOption[] = [
			{
				value:'0001',
				viewValue:'branch-test'
			}
		];
		expect(component.branchesOptions).toEqual(branchSpy);
	});

	it('should call close', () => {
		spyOn(sidenavService, 'close');
		component.back();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should call getProvincesList ',()=>{
		spyOn(component,'getProvincesList');
		spyOn(component,'getTypeCheckbooksList');
		spyOn(checkbooksTypesService,'findTypesOfCheckbooks');
		spyOn(checkbooksTypesService, 'getTypesOfCheckbookState').and.returnValue(
			new BehaviorSubject(typesOfCheckbookState)
		);
		component.loadCheckbooksTypes();
		expect(component.getProvincesList).toHaveBeenCalled();
		expect(component.getTypeCheckbooksList).toHaveBeenCalled();
	});

	it('function should return list provinces whit format wanted',()=>{
		component.provinces = typesOfCheckbookState.provinces;
		const provinceSpy: ISelectOption[] = [
			{
				viewValue: 'province-test',
				value: '0001'
			}
		];

		component.provincesOptions = component.getProvincesList();

		expect(component.provincesOptions).toEqual(provinceSpy);
	});

	it('function should return list type Checkbooks whit format wanted',()=>{
		component.typesOfCheckbooks = typesOfCheckbookState.typesOfCheckbooks;
		const typesOfCheckbooksSpy: ISelectOption[] = [
			{
				viewValue: 'TEST',
				value: 'CHECKBOOK_39'
			}
		];

		component.typesOfCheckbooksOptions = component.getTypeCheckbooksList();

		expect(component.typesOfCheckbooksOptions).toEqual(typesOfCheckbooksSpy);
	});

	it('should call requestCheckbooks, add and nextStep',()=>{
		component.requestCheckbooksForm.value.account = makeAccount({
			number: '123',
			currency: makeCurrency({code: '032'}),
			type: 'CC'
		});
		component.requestCheckbooksForm.value.typeCheckbook = 'CHECKBOOK_39';
		component.typesOfCheckbooks =  [
			makeCheckbookTypeInfo({
				type: 'CHECKBOOK_39',
				description:'TEST',
				code: '0001',
				deferred: 'S'})];
		component.provinces = [makeProvince({
			id:'0001',
			description: 'province-test',
			branchOffices: [makeBranch({
				id: '00001',
				description: 'branch-test'
			})]
		})];
		component.requestCheckbooksForm.value.province = '0001';
		component.requestCheckbooksForm.value.branches = '00001';
		spyOn(component.subscription,'add');
		spyOn(checkbooksService, 'requestCheckbooks').and.returnValue(of(request));
		spyOn(sidenavService, 'nextStep')
		component.requestCheckbook();
		expect(checkbooksService.requestCheckbooks).toHaveBeenCalled();
	})
});
