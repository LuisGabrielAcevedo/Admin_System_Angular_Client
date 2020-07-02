import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarTitleComponent } from './sidebar-title.component';

describe('SidebarTitleComponent', () => {
	let component: SidebarTitleComponent;
	let fixture: ComponentFixture<SidebarTitleComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidebarTitleComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarTitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
