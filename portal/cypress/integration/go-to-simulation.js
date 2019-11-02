import { ENVIRONMENT_OF_TEST } from '../environment';

const ENVIRONMENT = ENVIRONMENT_OF_TEST.toLowerCase();

export const goToSimulation = (user = 'j.arroyo') => {
  describe(`Go to Simulation, ${ENVIRONMENT}`, () => {
    it('Load login', () => {
      cy.visit(
        `https://viverebrasil.com.br/portalsanrio${ENVIRONMENT}/login.html`
      );
    });
    it('Set focus to input username', () => {
      cy.get('input[id=username]').click();
    });
    it('Set value to input username', () => {
      cy.get('input[id=username]').type(user);
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

    it('Set document number', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '*/persons/cuit*'
      }).as('apiGetCuilCuit');
      //cy.get('input[formcontrolname=personalDocumentNumber]');
      cy.wait(3000);
      cy.get('input[formcontrolname=personalDocumentNumber]')
        .click()
        .then(() => {
          cy.get('input[formcontrolname=personalDocumentNumber]').type(
            '33333333'
          );
          cy.get('h1.section-header__title').click();
          cy.wait('@apiGetCuilCuit').then(xhr => {
            assert.isNotNull(
              xhr.response.body.data,
              '/sanrioapigw/persons/cuit?document-number, get CUIT and CUIL'
            );
          });
        });
    });

    it('Set CUIL/CUIT', () => {
      cy.get('ng-select').then(selectList => {
        //cy.get(selectList[2]).click();
        cy.get(selectList[2])
          .click()
          .then(() => {
            cy.get('.ng-option').then(option => option[0].click());
          });
        //console.log(cy.get(selectList[2][1]));
        //cy.get(selectList[2]).
      });
    });

    it('Set Sexo', () => {
      cy.get('ng-select').then(selectList => {
        cy.get(selectList[3])
          .click()
          .then(() => {
            cy.get('.ng-option').then(option => option[1].click());
          });
      });
    });

    it('Set Born ate', () => {
      cy.get('input[formcontrolname=birthDate]')
        .click()
        .then(() => {
          cy.get('input[formcontrolname=birthDate]').type('12121990');
        });
    });

    it('Set Salary', () => {
      cy.get('input[formcontrolname=salary]')
        .click()
        .then(() => {
          cy.get('input[formcontrolname=salary]').type('1212990');
        });
    });

    it('Set Brand', () => {
      cy.get('ng-select').then(selectList => {
        cy.get(selectList[4])
          .click()
          .then(() => {
            cy.get('.ng-option').then(option => option[1].click());
          });
      });
    });

    it('Set Model', () => {
      cy.wait(2000);
      cy.get('ng-select').then(selectList => {
        cy.get(selectList[5])
          .click()
          .then(() => {
            cy.get('.ng-option').then(option => option[1].click());
          });
      });
    });
    it('Set Year', () => {
      cy.wait(2000);
      cy.get('ng-select').then(selectList => {
        cy.get(selectList[6])
          .click()
          .then(() => {
            cy.get('.ng-option').then(option => option[1].click());
          });
      });
    });
    it('Simulate', () => {
      cy.contains(' Simular').click();
    });
  });
};
