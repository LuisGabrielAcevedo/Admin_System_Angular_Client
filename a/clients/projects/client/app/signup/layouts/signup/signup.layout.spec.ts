import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLayout } from './signup.layout';
import { CoreModule } from '@angular/flex-layout';
import { MainModule } from '@mcy/main/main.module';
import { TranslateModule } from '@ngx-translate/core';

describe('SignupLayout', () => {
	let component: SignupLayout;
	let fixture: ComponentFixture<SignupLayout>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SignupLayout ],
			imports: [
				CoreModule,
				MainModule,
				TranslateModule.forRoot() 
			]
		})
		.compileComponents();
 	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupLayout);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
