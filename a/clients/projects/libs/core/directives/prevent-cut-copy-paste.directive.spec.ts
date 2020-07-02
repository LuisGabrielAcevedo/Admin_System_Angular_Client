import { PreventCutCopyPasteDirective } from './prevent-cut-copy-paste.directive';
import { async, TestBed } from '@angular/core/testing';

describe('PreventCutCopyPasteDirective', () => {
	const directive = new PreventCutCopyPasteDirective();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PreventCutCopyPasteDirective]
		}).compileComponents();
	}));
	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should call function preventDefault when trying to copy', () => {
		const eventCopy = new KeyboardEvent('copy', {});
		spyOn(eventCopy, 'preventDefault');
		directive.blockCopy(eventCopy);
		expect(eventCopy.preventDefault).toHaveBeenCalled();
	});

	it('should call function preventDefault when trying to cut', () => {
		const eventCut = new KeyboardEvent('cut', {});
		spyOn(eventCut, 'preventDefault');
		directive.blockCut(eventCut);
		expect(eventCut.preventDefault).toHaveBeenCalled();
	});

	it('should call function preventDefault when trying to paste', () => {
		const eventPaste = new KeyboardEvent('paste', {});
		spyOn(eventPaste, 'preventDefault');
		directive.blockPaste(eventPaste);
		expect(eventPaste.preventDefault).toHaveBeenCalled();
	});
});
