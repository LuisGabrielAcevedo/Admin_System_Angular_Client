import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavFeedbackComponent } from './sidenav-feedback.component';
import { FeedbackStatus } from 'client/app/app/models';

describe('SidenavFeedbackComponent', () => {
	let component: SidenavFeedbackComponent;
	let fixture: ComponentFixture<SidenavFeedbackComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidenavFeedbackComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidenavFeedbackComponent);
		component = fixture.componentInstance;
		component.message = 'Default';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set icon as check when status is not ERROR', () => {
		component.status = FeedbackStatus.success;
		component.ngOnChanges();
		expect(component.icon).toBe('check');
	});

	it('should set icon as fechar when status is ERROR', () => {
		component.status = FeedbackStatus.error;
		component.ngOnChanges();
		expect(component.icon).toBe('fechar');
	});
});
