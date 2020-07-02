const fs = require('fs');

// TODO cambiar cuando se genere la libreria
[
	'./projects/libs/main/version.ts',
	'./projects/client/app/version.ts',
	'./projects/backoffice/src/version.ts'
].forEach(item => {
	fs.writeFileSync(item, `// file generated automatically don't change it
export const version = '${process.env.npm_package_version}';\n`);
});
