import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ExportCSVModalComponent } from './export-csv-modal.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeDeleteContactModal } from '../../../models';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import {
	VoxelRadioButtonModule
} from '@voxel/mobile';

describe('ConfirmationModal', () => {
	let component: ExportCSVModalComponent;
	let fixture: ComponentFixture<ExportCSVModalComponent>;
	const dialogMock = {
		close: () => { }
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ExportCSVModalComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule,
				VoxelRadioButtonModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeDeleteContactModal({})}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExportCSVModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#ngOnInit should set all the categories available', () => {
		const categories: ISelectOption[] = [{value: 'provider', viewValue: 'PROVIDER'}, {value: 'others', viewValue: 'OTHERS'}];
		spyOn(component, 'getCategoriesList').and.returnValue(categories)
		component.ngOnInit();
		expect(component.categoriesList).toEqual(categories);
	});

	it('#onConfirm should set the selected category if the categories radio button is selected', () => {
		component.form.patchValue({
			filterType: 'category'
		});
		spyOn(component.dialogRef, 'close');
		component.onConfirm();
		expect(component.selectedCategory).toBe('OTHERS');
	});

	it('#onConfirm should set the selected category false if the categories radio button is NOT selected', () => {
		component.form.patchValue({
			filterType: 'favorites'
		});
		spyOn(component.dialogRef, 'close');
		component.onConfirm();
		expect(component.selectedCategory).toBeFalsy();
	});

	it('#onConfirm should call data.onConfirm method with selected category if categories radio button is selected', () => {
		component.form.patchValue({
			filterType: 'category'
		});
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.data.onConfirm).toHaveBeenCalledWith(component.selectedCategory);
	});

	it('#onConfirm should call data.onConfirm method with filter type if categories radio button is NOT selected', () => {
		component.form.patchValue({
			filterType: 'favorites'
		});
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.data.onConfirm).toHaveBeenCalledWith(component.form.value.filterType);
	});

	it('#onConfirm should call dialogRef close method', () => {
		component.form.patchValue({
			filterType: 'favorites'
		});
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	it('#onCancel should call onCancel from data and close the modal', () => {
		spyOn(component.data, 'onCancel');
		spyOn(component.dialogRef, 'close');
		component.onCancel();
		expect(component.data.onCancel).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	it('#onClose should call onClose from data and close the modal', () => {
		spyOn(component.data, 'onClose');
		spyOn(component.dialogRef, 'close');
		component.onClose();
		expect(component.data.onClose).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	it('#areCategoriesSelected should return TRUE if the filter type is category', () => {
		component.form.patchValue({
			filterType: 'category'
		});
		expect(component.areCategoriesSelected).toBeTruthy();
	});

	it('#areCategoriesSelected should return TRUE if the filter type is category', () => {
		component.form.patchValue({
			filterType: 'favorites'
		});
		expect(component.areCategoriesSelected).toBeFalsy();
	});
});
