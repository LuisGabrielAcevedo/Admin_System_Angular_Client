import packageJson from '../package.json';

export const packageData = { ...packageJson };

export const logVersion = () => {
  console.log(`%cFE version: ${packageData.version}`, 'color:blue');
};
