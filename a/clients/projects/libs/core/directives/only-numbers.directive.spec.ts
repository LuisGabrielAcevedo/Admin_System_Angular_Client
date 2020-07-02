import { OnlyNumbersDirective } from './only-numbers.directive';
import { TestBed, async } from '@angular/core/testing';

describe('OnlyNumberDirective', () => {
	const directive = new OnlyNumbersDirective();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OnlyNumbersDirective]
		}).compileComponents();
	}));
	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
	it('should return true if you receive a number else return false', () => {
		const eventNumber = new KeyboardEvent('keypress', {
			key: '3',
			code: '3'
		});
		const eventString = new KeyboardEvent('keypress', {
			key: 'w',
			code: 'w'
		});
		const eventSpace = new KeyboardEvent('keypress', {
			key: 'Space',
			code: 'Space'
		});

		const eventTab = new KeyboardEvent('keypress', {
			key: 'Tab',
			code: 'Tab'
		});

		const eventBackspace = new KeyboardEvent('keypress', {
			key: 'Backspace',
			code: 'Backspace'
		});
		expect(directive.keypress(eventNumber)).toBeTruthy();
		expect(directive.keypress(eventString)).toBeFalsy();
		expect(directive.keypress(eventSpace)).toBeFalsy();
		expect(directive.keypress(eventTab)).toBeFalsy();
		expect(directive.keypress(eventBackspace)).toBeFalsy();
	});
});
