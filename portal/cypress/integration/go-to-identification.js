import { ENVIRONMENT_OF_TEST } from '../environment';

const ENVIRONMENT = ENVIRONMENT_OF_TEST.toLowerCase();

describe(`Go to Simulation, ${ENVIRONMENT}`, () => {
  const USER = 'j.arroyo';
  it('Load login', () => {
    cy.visit(
      `https://viverebrasil.com.br/portalsanrio${ENVIRONMENT}/login.html`
    );
  });
  it('Set focus to input username', () => {
    cy.get('input[id=username]').click();
  });
  it('Set value to input username', () => {
    cy.get('input[id=username]').type(USER);
  });
  it('Click login button', () => {
    cy.get('button[type=submit]').click();
  });
  it('Load Identification', () => {
    cy.url().should('include', '/pre-proposal/identification');
    cy.get('h1.section-header__title').should(
      'contain',
      'Identificación de Cliente'
    );
  });
  it('Has Token', () => {
    let hasToken;
    cy.window()
      .then(win => {
        hasToken = !!win.sessionStorage.srt;
      })
      .then(() => {
        expect(hasToken).to.equal(true);
      });
  });
});
