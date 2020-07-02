export const REGEXP = {
	ALPHABETICAL: '^[a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü \-\']+',
	ALPHANUMERIC: '^[a-zA-Z0-9]+',
	USERNAME: '^[a-z0-9]+',
	NAME: '^([a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü]+ )+[a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü]+$|^[a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü]+$',
	NUMERIC: '^[0-9]*$',
	POSTAL_CODE: '^[0-9]{4}$|^[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{3}$',
	CUILT: '[0-9]{2}-[0-9]{8}-[0-9]{1}',
	EMAIL: '^([a-zA-Z0-9._!%#%&?{}|*^~`‘=+\/$\-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{3})(\.([a-zA-Z]{2}))?$',
	DESCRIPTION: '[a-zA-Z0-9 ]{0,80}',
	REFERENCE: '^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü ]+',
	DOTTED_NUMBER: /(\d)(?=(\d{3})+(?!\d))/g,
	ALIAS: '[a-zA-Z0-9\.]+',
	CBVU: '[0-9]+'
}
