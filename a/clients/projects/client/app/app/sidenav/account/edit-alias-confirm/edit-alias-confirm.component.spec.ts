import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAliasConfirmComponent } from './edit-alias-confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';

describe('EditAliasConfirmComponent', () => {
	let component: EditAliasConfirmComponent;
	let fixture: ComponentFixture<EditAliasConfirmComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EditAliasConfirmComponent],
			imports: [TranslateModule.forRoot(), CoreModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditAliasConfirmComponent);
		sidenavService = TestBed.get(SidenavService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call the function close in sidenavService', () => {
		spyOn(sidenavService, 'close');
		component.close();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
