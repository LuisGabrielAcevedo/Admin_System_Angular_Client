import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindUserSuccessComponent } from './bind-user-success.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';

describe('BindUserSuccessComponent', () => {
	let component: BindUserSuccessComponent;
	let fixture: ComponentFixture<BindUserSuccessComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BindUserSuccessComponent ],
			imports: [
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BindUserSuccessComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService); 
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'close');
		component.finish();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
