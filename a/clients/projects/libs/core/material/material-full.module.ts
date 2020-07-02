import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {
	MatRadioModule,
	MatDatepickerModule,
	MatSelectModule,
	MatMenuModule,
	MatNativeDateModule,
	MatSlideToggleModule,
	MatSliderModule,
	MatTableModule,
	MatStepperModule,
	MatAutocompleteModule,
	MatInputModule,
	MatPaginatorModule,
	MatButtonToggleModule,
} from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

const materialFullModules = [
	MatNativeDateModule,
	MatSlideToggleModule,
	MatRadioModule,
	MatDatepickerModule,
	MatSelectModule,
	MatMenuModule,
	MatSliderModule,
	CdkTableModule,
	MatTableModule,
	MatStepperModule,
	MatAutocompleteModule,
	MatDialogModule,
	MatSnackBarModule,
	MatToolbarModule,
	MatInputModule,
	MatSidenavModule,
	MatListModule,
	MatPaginatorModule,
	MatTabsModule,
	MatExpansionModule,
	MatButtonToggleModule,
];
/**
 * All modules to use in the app
 */
@NgModule({
	imports: materialFullModules,
	exports: materialFullModules,
	providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class MaterialFullModule {}
