import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BalanceDetailFullComponent } from './balance-detail-full.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';

describe('BalanceDetailFullComponent', () => {
	let component: BalanceDetailFullComponent;
	let fixture: ComponentFixture<BalanceDetailFullComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BalanceDetailFullComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [{ provide: SidenavService, useClass: SidenavServiceMock }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BalanceDetailFullComponent);
		sidenavService = TestBed.get(SidenavService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call the function close in sidenavService', () => {
		spyOn(sidenavService, 'close');
		component.end();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
