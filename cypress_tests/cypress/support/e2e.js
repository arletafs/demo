// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import CookieBot from "../pageObjects/cookiebot";



// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(()=>{
    // Reset login state for event testing
    cy.readFile('cypress/fixtures/data.json').then(data => {
        data.isLogin = false;
        cy.writeFile('cypress/fixtures/data.json', data);
      });

    // Load fixtures/data.json and save the variables as environment vars
    cy.loadTestDataFromFixture();
    cy.get('@testData').then((testData) => {
        Cypress.env('testData', testData);
      });

    cy.visit(Cypress.config('baseUrl'))
    cy.wait(500)

    // Accept cookies if prompted
    cy.get('body')
      .then(($body) => {
        if ($body.find('[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]').is(':visible')){
            CookieBot.acceptCookies()
        }
    }
            )
    }
)

Cypress.on('uncaught:exception', (err) => {
    return false
})