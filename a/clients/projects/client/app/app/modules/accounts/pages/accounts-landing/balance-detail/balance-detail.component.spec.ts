import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { BalanceDetailComponent } from './balance-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('BalanceDetailComponent', () => {
	let component: BalanceDetailComponent;
	let fixture: ComponentFixture<BalanceDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BalanceDetailComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [CoreModule.forRoot(), TranslateModule.forRoot()],
			providers: [
				{provide: AccountService, useClass: AccountServiceMock},
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BalanceDetailComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
