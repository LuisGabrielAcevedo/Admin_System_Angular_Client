import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { UserProfileImageComponent } from './user-profile-image.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('UserProfileImageComponent', () => {
	let fixture: ComponentFixture<UserProfileImageComponent>;
	let component: UserProfileImageComponent;
	let utilsService: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UserProfileImageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock}
			],
			imports: [ TranslateModule.forRoot() ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfileImageComponent);
		component = fixture.componentInstance;
		utilsService = TestBed.get(UtilsService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#displayName should call #formatProfileName with the input name as parameter', () => {
		component.name = 'jhon doe';
		spyOn(utilsService, 'formatProfileName').and.returnValue('');
		const displayName = component.displayName;
		expect(utilsService.formatProfileName).toHaveBeenCalledWith(component.name);
		expect(displayName).toBeDefined();
	});
});