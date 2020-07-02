import { NgModule } from '@angular/core';
import { AmountPipe } from './amount';
import { AccountNumberPipe } from './account-number';
import { AccountTypePipe } from './account-type';
import { CensoredPipe } from '@mcy/core/pipes/censored';
import { CbuToAccount } from '@mcy/core/pipes/cbu-to-account';

const importExport = [
	AmountPipe,
	AccountNumberPipe,
	AccountTypePipe,
	CensoredPipe,
	CbuToAccount
];

@NgModule({
	declarations: importExport,
	exports: importExport,
	imports: [],
	providers: []
})
export class PipesModule {}
