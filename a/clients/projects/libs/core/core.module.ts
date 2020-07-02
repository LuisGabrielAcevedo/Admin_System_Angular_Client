import { ModuleWithProviders, NgModule } from '@angular/core';
import { ICoreConfig } from './core.interfaces';
import { CONFIG_MODULE_CORE } from './core.config';
import { ComponentsModule } from './components/components.module';
import { DataService } from './services/data.service';
import { ToastService } from './services/toast.service';
import { PasswordService } from './services/password.service';
import { PipesModule } from './pipes/pipes.module';
import { DirectiveModule } from './directives/directives.module';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { tooltipOptions } from 'client/app/app/constants/tooltip';
import { ModalService } from './services/modal.service';
import { ValidatorService } from './services/validator.service';

const importExports = [
	ComponentsModule,
	PipesModule,
	DirectiveModule,
];

@NgModule({
	imports: [ ...importExports, TooltipModule.forRoot(tooltipOptions as TooltipOptions),],
	exports: [ ...importExports, TooltipModule ],
	declarations: []

})
export class CoreModule {
	static forRoot(config?: ICoreConfig): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: [
				ToastService,
				DataService,
				ModalService,
				PasswordService,
				ValidatorService,
				{
					provide: CONFIG_MODULE_CORE,
					useValue: config
				}
			]
		};
	}
}
