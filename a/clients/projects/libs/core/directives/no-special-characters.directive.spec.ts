import { NoSpecialCharactersDirective } from './no-special-characters.directive';
import { async, TestBed } from '@angular/core/testing';

const directive = new NoSpecialCharactersDirective();

describe('NoSpecialCharactersDirective', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NoSpecialCharactersDirective]
		}).compileComponents();
	}));
	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
	it('should return true if you receive a string else return false', () => {
		const eventSpecialCharater = new KeyboardEvent('keypress', {
			key: '/'
		});
		const eventString = new KeyboardEvent('keypress', {
			key: 'w'
		});
		const eventBackspace = new KeyboardEvent('keypress', {
			key: 'Backspace',
			code: 'Backspace'
		});
		const eventSemicolon = new KeyboardEvent('keypress', {
			key: 'Semicolon',
			code: 'Semicolon'
		});
		const eventSpace = new KeyboardEvent('keypress', {
			key: ' ',
			code: 'Space'
		});
		expect(directive.keypress(eventSpecialCharater)).toBeFalsy();
		expect(directive.keypress(eventString)).toBeTruthy();
		expect(directive.keypress(eventBackspace)).toBeTruthy();
		expect(directive.keypress(eventSpace)).toBeTruthy();
		expect(directive.keypress(eventSemicolon)).toBeTruthy();
	});
});
