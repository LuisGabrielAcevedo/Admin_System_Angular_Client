import { NgModule } from '@angular/core';
import { MaterialFullModule } from '../material/material-full.module';
import { MainModule } from '@mcy/main/main.module';
import { RangeComponent } from './range/range.component';
import { RangeLineComponent } from './range/range-line.component';
import { SelectComponent } from './select/select.component';
import { DateComponent } from './date/date.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { FlowExitModalComponent } from './flow-exit-modal/flow-exit-modal.component';
import { LoadingDataErrorComponent } from './loading-data-error/loading-data-error.component';
import { LinkComponent } from './link/link.component';

const modulesImportExport = [
	MainModule,
	MaterialFullModule
];

const componentsImportExport = [
	RangeComponent,
	RangeLineComponent,
	SelectComponent,
	DateComponent,
	ModalContentComponent,
	IconButtonComponent,
	FlowExitModalComponent,
	LoadingDataErrorComponent,
	LinkComponent
];

@NgModule({
	declarations: componentsImportExport,
	imports: modulesImportExport,
	exports: [
		...modulesImportExport,
		...componentsImportExport
	],
	entryComponents: [
		FlowExitModalComponent,
	],
	providers: []
})
export class ComponentsModule {
}
