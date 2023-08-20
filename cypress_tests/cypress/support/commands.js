// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import get from 'lodash/get';

Cypress.Commands.add('performActionAndVerifyEvents', (actionFn, eventName, loginTrue, loginFalse) => {

  // Intercept the first request to segment
  cy.wait(1000);
  //cy.intercept('POST', '/v1/t', { times: 1 }).as('segment');
  cy.intercept('POST', '/v1/t').as('segment');

  // Perform user action(s) that would trigger the event
  actionFn();

  // Wait for the interception to complete before proceeding to assertion
    cy.waitForTheRightRequest('@segment', { event: `${eventName}` } , 10).then((interception) => {
    const requestBody = JSON.parse(interception.request.body);

      // Check if event name matches the expected value
      if (requestBody.event === eventName) {
          // Get properties according to user's login status
          cy.readFile('cypress/fixtures/data.json').then((jsonData) => {
            const isLogin = jsonData.isLogin;
            const eventProps = isLogin === true ? loginTrue : loginFalse;

        //Get property name by reading the path
        eventProps.forEach((prop) => {
            Object.entries(prop).forEach(([keyPath, value]) => {
              const key = get(requestBody, keyPath);

              //Verify property value
              if (value instanceof RegExp) {
                expect(key).to.match(value); // Use .match() for regex pattern, e.g. timestamp
              } else {
                expect(key).to.eql(value); // Use .eq() for exact string matching
              }
            });
          });
        });
      }
      
      else {
        // Event not found, throw an error with a custom message
        const errorMsg = `Event "${eventName}" not found in intercepted request. The intercepted request body is:\n${JSON.stringify(requestBody)}`;
        throw new Error(errorMsg);
      }
  });
});

// Function to loop wait until it finds the right segment request
Cypress.Commands.add('waitForTheRightRequest', (alias, partialRequest, maxRequests, level = 0) => {
  if (level === maxRequests) {
    throw `${maxRequests} requests exceeded`
  }
  return cy.wait(alias)
    .then(interception => {
      const isMatch = Cypress._.isMatch(JSON.parse(interception.request.body), partialRequest)
      if (isMatch) {
        return interception
      } else {
        return cy.waitForTheRightRequest(alias, partialRequest, maxRequests, level+1)
      }
    })
})

// This is a command to load data.json that contains test data
Cypress.Commands.add('loadTestDataFromFixture', () => {
  return cy.fixture('data').then((testData) => {
    cy.wrap(testData).as('testData');
  });
});

// This is a command to turn the data.json into environment variables
Cypress.Commands.add('getTestData', () => {
  return cy.wrap(Cypress.env('testData'));
});