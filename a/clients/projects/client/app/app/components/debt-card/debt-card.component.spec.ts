import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtCardComponent } from './debt-card.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('DebtCardComponent', () => {
	let component: DebtCardComponent;
	let fixture: ComponentFixture<DebtCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DebtCardComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				PipesModule,
			],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DebtCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
