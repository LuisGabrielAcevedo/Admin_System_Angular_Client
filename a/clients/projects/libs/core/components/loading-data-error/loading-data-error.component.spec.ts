import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingDataErrorComponent } from './loading-data-error.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoadingDataErrorComponent', () => {
	let component: LoadingDataErrorComponent;
	let fixture: ComponentFixture<LoadingDataErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoadingDataErrorComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ 
				TranslateModule.forRoot() 
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingDataErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
