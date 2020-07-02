import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInnerHtmlComponent } from './dynamic-inner-html.component';

describe('DynamicInnerHtmlComponent', () => {
	let component: DynamicInnerHtmlComponent;
	let fixture: ComponentFixture<DynamicInnerHtmlComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DynamicInnerHtmlComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicInnerHtmlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
