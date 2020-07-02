import { EnterpriseDetailsComponent } from './enterprise-details.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';

describe('EnterpriseDetailsComponent', () => {
	let component: EnterpriseDetailsComponent;
	let fixture: ComponentFixture<EnterpriseDetailsComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EnterpriseDetailsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterpriseDetailsComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'close');
		component.back();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
