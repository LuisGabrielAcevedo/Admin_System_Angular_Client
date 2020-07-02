import { REGEXP } from '@mcy/core/constants';
export const ITEMS_PER_PAGE_LARGE = 10;

export const ITEMS_PER_PAGE = 10;

export const CONSTRAINTS = {
	CUIT: {
		PATTERN: '^[a-zA-Z0-9]+',
		MAX_LENGTH: 11,
		MIN_LENGTH: 11,
	},
	DOCUMENTS: {
		PATTERN: REGEXP.ALPHANUMERIC
	}
}
