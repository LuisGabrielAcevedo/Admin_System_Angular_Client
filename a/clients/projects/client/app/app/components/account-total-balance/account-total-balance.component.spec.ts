import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTotalBalanceComponent } from './account-total-balance.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';

describe('AccountTotalBalanceComponent', () => {
	let component: AccountTotalBalanceComponent;
	let fixture: ComponentFixture<AccountTotalBalanceComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AccountTotalBalanceComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				PipesModule
			],
			providers: [
				UtilsService
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountTotalBalanceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
