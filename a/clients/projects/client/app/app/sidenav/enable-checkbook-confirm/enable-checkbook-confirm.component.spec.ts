import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnableCheckbookConfirmComponent } from './enable-checkbook-confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';

describe('EnableCheckbookConfirmComponent', () => {
	let component: EnableCheckbookConfirmComponent;
	let fixture: ComponentFixture<EnableCheckbookConfirmComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EnableCheckbookConfirmComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [{ provide: SidenavService, useClass: SidenavServiceMock }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnableCheckbookConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
