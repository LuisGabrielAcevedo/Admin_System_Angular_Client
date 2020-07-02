import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayout } from './page-layout.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MainModule } from '@mcy/main/main.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('PageLayout', () => {
	let component: PageLayout;
	let fixture: ComponentFixture<PageLayout>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PageLayout ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ MainModule ],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageLayout);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
