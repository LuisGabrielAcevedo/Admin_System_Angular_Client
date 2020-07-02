import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageComponent } from './profile-image.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MainModule } from '@mcy/main/main.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('ProfileImageComponent', () => {
	let component: ProfileImageComponent;
	let fixture: ComponentFixture<ProfileImageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileImageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ MainModule ],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
