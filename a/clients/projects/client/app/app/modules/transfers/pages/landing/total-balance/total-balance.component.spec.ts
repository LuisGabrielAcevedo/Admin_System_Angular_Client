import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBalanceComponent } from './total-balance.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';

describe('TotalBalanceComponent', () => {
	let component: TotalBalanceComponent;
	let fixture: ComponentFixture<TotalBalanceComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TotalBalanceComponent ],
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
		fixture = TestBed.createComponent(TotalBalanceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
