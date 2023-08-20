const { defineConfig } = require("cypress");
const { cloudPlugin } = require("cypress-cloud/plugin");

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  env: {
    username: 'arletafenty@gmail.com',
    password: '123456'
  },
  e2e: {
    baseUrl: 'https://cypress.staging-test.co',
    specPattern: 'cypress/e2e/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      return cloudPlugin(on, config);
    },
  },
})
