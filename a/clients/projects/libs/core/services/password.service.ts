import { Injectable } from '@angular/core';

const oneUpperCase = '(.*?[A-Z])';
const oneDigit = '(.*?\\d)';
const oneSpecialCharacter = '[^A-Za-z0-9]';

const atLeastOneUpperCaseRegex = new RegExp(`${oneUpperCase}`);
const atLeastOneDigitRegex = new RegExp(`${oneDigit}`);
const atLeastTwoDigitsRegex = new RegExp(`${oneDigit}{2,}`);
const atLeastOneSpecialCharacterRegex = new RegExp(`${oneSpecialCharacter}`);
const atLeastTwoSpecialCharactersRegex = new RegExp(`${oneSpecialCharacter}{2,}`);
const atLeastEightCharsRegex = /.{8}/;

@Injectable()
export class PasswordService {

	private isWeak(password: string): boolean {
		return (
			atLeastEightCharsRegex.test(password) &&
			atLeastOneUpperCaseRegex.test(password) &&
			atLeastOneDigitRegex.test(password)
		);
	}

	private isMedium(password: string): boolean {
		return (
			this.isWeak(password) &&
			atLeastOneSpecialCharacterRegex.test(password)
		);
	}

	private isStrong(password: string): boolean {
		return (
			atLeastEightCharsRegex.test(password) &&
			atLeastOneUpperCaseRegex.test(password) &&
			atLeastTwoDigitsRegex.test(password) &&
			atLeastTwoSpecialCharactersRegex.test(password)
		);
	}

	getLevel(password: string): number {
		if(this.isStrong(password)) {
			return 3;
		}
		if(this.isMedium(password)) {
			return 2;
		}
		if(this.isWeak(password)) {
			return 1;
		}
		return 0;
	}

}
