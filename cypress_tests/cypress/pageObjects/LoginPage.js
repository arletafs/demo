import * as locators from '../locators/login.locators';
import * as my_profile from '../locators/my_profile.locators';
import * as search from '../locators/search_page.locators'


class LoginPage 
{
    locatorHeader()
    {
        return cy.get(locators.hero_search_button)
    }
    locatorLoginBtn()
    {
        return cy.get(locators.login_button)
    }
    locatorEmail()
    {
        return cy.get('seez-sdk-login').shadow().find(locators.login_email_field)
    }
    locatorCheckbox()
    {
        return cy.get('seez-sdk-login').shadow().find(locators.terms_of_use)
    }
    locatorRequestOTPButton()
    {
        return cy.get('seez-sdk-login').shadow().find(locators.login_request_code_button)
    }
    locatorInputCode(inputCode)
    {
        return cy.get('seez-sdk-login').shadow().find(inputCode)
    }
    locatorLoginOTP()
    {
        return cy.get('seez-sdk-login').shadow().find(locators.login_authenticate_button)
    }

    loginwithOTP(email)
    {
        cy.get(my_profile.my_profile).eq(1).click()
        cy.wait(2000)
        cy.get(my_profile.login).click()
        this.locatorEmail().type(email, {force: true});
        this.locatorCheckbox().click();
        this.locatorRequestOTPButton().click();

       // this part of the code will be refactored 
        cy.get('seez-sdk-login').shadow().find('[data-index=0]').type('1')
        cy.get('seez-sdk-login').shadow().find('[data-index=1]').type('2')
        cy.get('seez-sdk-login').shadow().find('[data-index=2]').type('3')
        cy.get('seez-sdk-login').shadow().find('[data-index=3]').type('4')
        cy.get('seez-sdk-login').shadow().find('[data-index=4]').type('5')
        cy.get('seez-sdk-login').shadow().find('[data-index=5]').type('6')
        cy.get('seez-sdk-login').shadow()
          .should('not.exist') //wait until modal is closed
        cy.get('.authenticatedUserGreet') //wait until user's name is shown
        
        // Log login state for event testing
        cy.readFile('cypress/fixtures/data.json').then(data => {
        data.isLogin = true;
        cy.writeFile('cypress/fixtures/data.json', data);
      });

          
    }

    logout(){
        cy.get(my_profile.my_profile).eq(1).click()
        cy.get(my_profile.logout).click({force: true})
        cy.get('seez-sdk-logout').shadow()
          .find('button')
          .contains('Log ud').click()

        //assertions
        cy.get(my_profile.my_profile).first().should('include.text', 'Log ind')
        
        // Log login state for event testing
        cy.readFile('cypress/fixtures/data.json').then(data => {
            data.isLogin = false;
            cy.writeFile('cypress/fixtures/data.json', data);
          });
    
    }
}
export default new LoginPage();