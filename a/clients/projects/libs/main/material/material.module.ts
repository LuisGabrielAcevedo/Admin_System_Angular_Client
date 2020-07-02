import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatInputModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatDialogModule
} from '@angular/material';

/**
 * Be careful, this module will be sent to the main bundle, and it should be smaller as possible
 *
 * The most basic and minimal modules for main (login).
 * Don't overload this module please!
 *
 * If you want to add something, may you want to add it to the material-full.module rather than this one.
 */
const materialModules = [
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatIconModule,
	MatFormFieldModule,
	FlexLayoutModule,
	MatDialogModule
];
@NgModule({
	imports: [materialModules],
	exports: [materialModules],
	declarations: []
})
export class MaterialModule {}
