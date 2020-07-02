import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwornDeclarationComponent } from './sworn-declaration.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SwornDeclarationComponent', () => {
	let component: SwornDeclarationComponent;
	let fixture: ComponentFixture<SwornDeclarationComponent>;
	let sidenavService: SidenavService;
	const data = {
		onAcceptTerms: () => {}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SwornDeclarationComponent ],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SwornDeclarationComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		component.data = data;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close the sidenav', () => {
		spyOn(sidenavService, 'close');
		component.back();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should accept the sworn declaration and close the sidenav', () => {
		spyOn(sidenavService, 'close');
		spyOn(component.data, 'onAcceptTerms');
		component.confirmSwornDeclaration();
		expect(sidenavService.close).toHaveBeenCalled();
		expect(component.data.onAcceptTerms).toHaveBeenCalled();
	});
});
