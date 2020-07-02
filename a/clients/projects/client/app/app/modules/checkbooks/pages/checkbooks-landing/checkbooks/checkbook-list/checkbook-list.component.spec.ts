import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckbookListComponent } from './checkbook-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';

describe('CheckbookListComponent', () => {
	let component: CheckbookListComponent;
	let fixture: ComponentFixture<CheckbookListComponent>;
	let service: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CheckbookListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule.forRoot(),
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TranslateService, useClass: TranslateService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckbookListComponent);
		service = TestBed.get(UtilsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call formatDate from utils service', () => {
		spyOn(service, 'formatDate');
		component.formatDate(new Date());
		expect(service.formatDate).toHaveBeenCalled();
	});
});
