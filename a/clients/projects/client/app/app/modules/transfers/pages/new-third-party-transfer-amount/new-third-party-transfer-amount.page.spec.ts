import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewThirdPartyTransferAmountPage } from './new-third-party-transfer-amount.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { Router } from '@angular/router';
import {
	ITransferState,
	makeTransferState,
	IConcept, makeConcept
} from 'client/app/app/models';
import { makeTransferFormValue } from 'client/app/app/models/transfers';
import { BehaviorSubject, of } from 'rxjs';
import { ConceptServiceMock } from 'client/app/app/services/concept.service.mock';
import { ConceptService } from 'client/app/app/services/concept.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewThirdPartyTransferAmountPage', () => {
	let component: NewThirdPartyTransferAmountPage;
	let fixture: ComponentFixture<NewThirdPartyTransferAmountPage>;
	let router: Router;
	let transferService: TransferService;
	let sidenavService: SidenavService;
	let conceptService: ConceptService;
	const transferState: ITransferState = makeTransferState({});
	const code: string = 'COD';
	const concept: IConcept = makeConcept({code});
	const conceptsList: IConcept[] = [concept];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NewThirdPartyTransferAmountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				ReactiveFormsModule,
				FormsModule
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: ConceptService, useClass: ConceptServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewThirdPartyTransferAmountPage);
		component = fixture.componentInstance;
		transferService = TestBed.get(TransferService);
		sidenavService = TestBed.get(SidenavService);
		conceptService = TestBed.get(ConceptService);
		router = TestBed.get(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the transfer state without data', () => {
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState({ }))
		);
		const spyFormAmount = spyOn(component.amountForm.get('amount')!, 'patchValue');
		const spyFormDescription = spyOn(component.amountForm.get('description')!, 'patchValue');
		component.ngOnInit();
		expect(spyFormAmount).toHaveBeenCalledWith(transferState.newTransferFormValue.amount);
		expect(spyFormDescription).toHaveBeenCalledWith(transferState.newTransferFormValue.paymentDescription);
		expect(transferService.getTransferState).toHaveBeenCalled();
	});

	it('should get the transfer state without data but with concepts', () => {
		transferState.newTransferFormValue.concept.code = '001';
		spyOn(conceptService, 'getConcepts').and.returnValue(of(true));
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState({
				newTransferFormValue: makeTransferFormValue({
					concept: makeConcept({})
				})
			}))
		);
		component.ngOnInit();
		expect(conceptService.getConcepts).toHaveBeenCalled();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});

	it('should get the transfer state without concepts', () => {
		spyOn(conceptService, 'getConcepts').and.returnValue(of(false));
		component.ngOnInit();
		expect(conceptService.getConcepts).toHaveBeenCalled();
	});

	it('should get the transfer state with data', () => {
		transferState.newTransferFormValue.concept.code = '001';
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState({
				newTransferFormValue: makeTransferFormValue({
					concept: makeConcept({code: '001'})
				})
			}))
		);
		const spyFormConcept = spyOn(component.amountForm.get('concept')!, 'patchValue');
		const spyFormSwornDeclaration = spyOn(component.amountForm.get('swornDeclaration')!, 'patchValue');
		spyOn(conceptService, 'getConcepts').and.returnValue(of(true));
		component.ngOnInit();
		expect(spyFormConcept).toHaveBeenCalledWith(transferState.newTransferFormValue.concept);
		expect(spyFormSwornDeclaration).toHaveBeenCalledWith(true);
		expect(conceptService.getConcepts).toHaveBeenCalled();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});

	it('should go to the previous page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferContact']);
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers']);
	});

	it('should navigate on goToSelectTransfer', () => {
		spyOn(router, 'navigate');
		component.goToSelectTransfer();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/new']);
	});

	it('should go to the next page', () => {
		spyOn(router, 'navigate');
		spyOn(transferService, 'updateTransferState');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferAccount']);
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});

	it('should get the concept list', () => {
		component.transferState = transferState;
		component.conceptState.concepts = conceptsList;
		const result = component.conceptsList;
		expect(result).toEqual([{
			viewValue: component.conceptState.concepts[0].description,
			value: component.conceptState.concepts[0].code
		}]);
	});

	it('should enable the amount form', () => {
		const spyForm = spyOn(component.amountForm.get('swornDeclaration')!, 'enable');
		component.conceptState.concepts = [concept];
		component.amountForm.value.concept = concept;
		component.amountForm.value.concept.swornDeclaration = true;
		component.amountForm.value.conceptCode = code;
		component.conceptChange();
		expect(spyForm).toHaveBeenCalled();
	});

	it('should disable the amount form', () => {
		const spyForm = spyOn(component.amountForm.get('swornDeclaration')!, 'disable');
		component.conceptChange();
		expect(spyForm).toHaveBeenCalled();
	});

	it('should update the sworn declaration', () => {
		const spyForm = spyOn(component.amountForm.get('swornDeclaration')!, 'patchValue');
		component.updateSwornDeclaration(true);
		expect(spyForm).toHaveBeenCalledWith(true);
	});

	it('should open the sworn declaration sidenav', () => {
		spyOn(sidenavService, 'open');
		component.openSwornDeclaration();
		expect(sidenavService.open).toHaveBeenCalled();
	});
});
