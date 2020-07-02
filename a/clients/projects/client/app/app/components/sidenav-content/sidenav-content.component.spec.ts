import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavContentComponent } from './sidenav-content.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { MainService } from '@mcy/main/main.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('SidenavContentComponent', () => {

	let component: SidenavContentComponent;
	let fixture: ComponentFixture<SidenavContentComponent>;
	let service: SidenavService;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidenavContentComponent],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				MainService
			],
			imports: [
				RouterTestingModule,
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		service = TestBed.get(SidenavService);
		router = TestBed.get(Router);
		fixture = TestBed.createComponent(SidenavContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	xit('#ngOnInit should close the sidenav if it is open and the route has been changed', () => {
		spyOn(service, 'close');
		spyOnProperty(router, 'events').and.returnValue(of(new Event('NavigationEnd')));
		service.opened = true;
		component.ngOnInit();
		expect(service.close).toHaveBeenCalled();
	});

	it('#ngOnDestroy should unsubscribe when the component is destroyed', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should preClose function is called', () => {
		spyOn(service, 'preClose');
		component.closeSidenav();
		expect(service.preClose).toHaveBeenCalled();
	});

	it('should cancel function is called', () => {
		spyOn(service, 'cancel');
		component.cancel();
		expect(service.cancel).toHaveBeenCalled();
	});

	it('should close function is called', () => {
		spyOn(service, 'close');
		component.close();
		expect(service.close).toHaveBeenCalled();
	});
});
