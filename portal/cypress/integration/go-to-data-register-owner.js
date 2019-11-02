import { goToSimulation } from './go-to-simulation';
import { ENVIRONMENT_OF_TEST } from '../environment';

const ENVIRONMENT = ENVIRONMENT_OF_TEST.toLowerCase();

describe(`Go to Data Register Owner ${ENVIRONMENT}`, () => {
  context('goToSimulation.js', () => {
    goToSimulation('j.arroyo');
  });
});
