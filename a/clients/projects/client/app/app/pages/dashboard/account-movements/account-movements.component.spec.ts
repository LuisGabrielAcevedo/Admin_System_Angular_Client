import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMovementsComponent } from './account-movements.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';

describe('AccountMovementsComponent', () => {
	let component: AccountMovementsComponent;
	let fixture: ComponentFixture<AccountMovementsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AccountMovementsComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
			],
			imports: [
				CoreModule,
				TranslateModule.forRoot(),
				PipesModule,
				RouterTestingModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountMovementsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
