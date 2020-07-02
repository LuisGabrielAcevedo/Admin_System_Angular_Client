import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { AccountDetailsComponent } from './account-details.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';

describe('AccountDetailsComponent', () => {
	let component: AccountDetailsComponent;
	let fixture: ComponentFixture<AccountDetailsComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ AccountDetailsComponent ],
		schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		imports: [
			TranslateModule.forRoot(),
			PipesModule,
		],
		providers: [
			{ provide: UtilsService, useClass: UtilsServiceMock },
		]
	})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
