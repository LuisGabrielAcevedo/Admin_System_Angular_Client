import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { PreventCutCopyPasteDirective } from './prevent-cut-copy-paste.directive';
import { NoSpecialCharactersDirective } from './no-special-characters.directive';
import { AliasDirective } from './alias.directive';

const importExport = [
	OnlyNumbersDirective,
	PreventCutCopyPasteDirective,
	AliasDirective,
	NoSpecialCharactersDirective
];

@NgModule({
	declarations: importExport,
	exports: importExport,
	imports: [],
	providers: [],
})
export class DirectiveModule {}
