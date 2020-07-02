import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCheckbooksSuccessComponent } from './request-checkbooks-success.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { ICheckbook, ICheckbookState } from 'client/app/app/models';

describe('RequestCheckbooksSuccessComponent', () => {
	let component: RequestCheckbooksSuccessComponent;
	let fixture: ComponentFixture<RequestCheckbooksSuccessComponent>;
	let sidenavService: SidenavService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RequestCheckbooksSuccessComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: SidenavService, useClass: SidenavServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestCheckbooksSuccessComponent);
		sidenavService = TestBed.get(SidenavService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call close', () => {
		spyOn(sidenavService, 'close');
		component.end();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should return state agree the information of data',() => {

		spyOn(component, 'getStateAuthorized')
		component.data.state = 'AUTHORIZED';
		fixture.detectChanges();
		expect(component.getStateAuthorized).toHaveBeenCalled();

		component.data.state = 'PARTIALLY_AUTHORIZED';
		expect(component.messageSubTitle).toEqual('pages.checkbooks.success.partially_authorized');

		component.data.state = 'PENDING_APPROVAL';
		expect(component.messageSubTitle).toEqual('pages.checkbooks.success.pending_approval');

		component.data.state = 'REJECTED';
		expect(component.messageSubTitle).toEqual('pages.checkbooks.success.rejected');

		component.data.state = 'CANCELLED';
		expect(component.messageSubTitle).toEqual('pages.checkbooks.success.rejected');

	});

	it('should call getStateAuthorized and return state agree the information of data APPROVED',()=>{
		component.data.state = 'AUTHORIZED';
		const stateSpy: ICheckbookState  = (component.data.content as ICheckbook).state = 'APPROVED';
		const message = component.getStateAuthorized(stateSpy)
		expect(message).toEqual('pages.checkbooks.success.success');
	});

	it('should call getStateAuthorized and return state agree the information of data DENIED',()=>{
		component.data.state = 'AUTHORIZED';
		const stateSpy: ICheckbookState  = (component.data.content as ICheckbook).state = 'DENIED';
		const message = component.getStateAuthorized(stateSpy)
		expect(message).toEqual('pages.checkbooks.success.rejected');
	});

	it('should call getStateAuthorized and return state agree the information of data DENIED',()=>{
		component.data.state = 'REJECTED';
		const stateSpy: ICheckbookState  = (component.data.content as ICheckbook).state = '';
		const message = component.getStateAuthorized(stateSpy)
		expect(message).toEqual('');
	});
});
