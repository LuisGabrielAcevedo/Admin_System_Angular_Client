import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountSelectorComponent } from './account-selector.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { MatMenuModule } from '@angular/material';
import { PipesModule } from '@mcy/core/pipes/pipes.module';

describe('AccountSelectorComponent', () => {
	let component: AccountSelectorComponent;
	let fixture: ComponentFixture<AccountSelectorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AccountSelectorComponent ],
			imports: [
				MatMenuModule,
				PipesModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
