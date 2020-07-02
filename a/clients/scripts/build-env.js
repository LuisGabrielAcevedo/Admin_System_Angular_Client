const fs = require('fs');

const targetPath1 = `./projects/client/environments/environment.ts`;
const targetPath2 = `./projects/backoffice/src/environments/environment.ts`;
const environments = process.env;
const environmentFile = {};
const flagJenkins = 'JENKINS';
let production = false;

const environmentConfig = require('../environment.json');

if (!Array.isArray(environmentConfig)) {
	throw '`environment.json` should be an Array of: {environment:"", variable: "", defaultValue: ""}';
}

let configServerOriginal = environments[flagJenkins];
let isServer = configServerOriginal;

if (isServer !== undefined) {
	isServer = JSON.parse(isServer);
} else {
	isServer = environmentConfig.find(config => config.environment === flagJenkins);
	isServer = isServer ? isServer.defaultValue : false;
}


environmentConfig.forEach(item => {
	let envValue = environments[item.environment];

	if (envValue !== undefined) {
		try {
			envValue = JSON.parse(envValue);
		} catch (e) {
			// intentional fallback
			envValue = `'${envValue}'`;
		}
		environmentFile[item.variable] = envValue;
	} else {
		if (isServer) {
			console.error(`You need to add to your environment: "${item.environment}"`);
			process.exit(1);
		} else {
			environmentFile[item.variable] = item.defaultValue;
		}
	}

	if (item.variable === 'production' && environmentFile[item.variable]) {
		production = true;
	}

});


let environmentString = JSON.stringify(environmentFile, null, '\t')
.replace(/"/g, '');

environmentString = `/* DON'T CHANGE THIS FILE! This file was generated automatically!
Use \`node scripts/build-env\` instead. */\n
export const environment = ${environmentString};\n`;

if (!production) {
	environmentString += `\nimport 'zone.js/dist/zone-error';\n`;
}

fs.writeFile(targetPath1, environmentString, function(err) {
	if (err) {
		console.log(err);
	}
	console.log(`Output generated at ${targetPath1}`);
});

fs.writeFile(targetPath2, environmentString, function(err) {
	if (err) {
		console.log(err);
	}
	console.log(`Output generated at ${targetPath1}`);
});
