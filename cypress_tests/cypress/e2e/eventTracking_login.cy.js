import event from '../pageObjects/EventTracking';
import login from '../pageObjects/LoginPage';

if (Cypress.config("baseUrl") == "https://cypress.dev-test.co") { //run in dev only, because it's not implemented in staging

describe ('Verifying tracking event as a logged in user', ()=>
{

    it('when searching by text then favourite a car', ()=>
    {
        login.loginwithOTP(Cypress.env('username'));
        event.go_to_search_page();
        event.search_page_text(Cypress.env('event_car_ref'));
        event.search_favourite();
        event.search_car_click();
        event.listing_favourite();
    })

    it('when clicking Buy Online in listing page', ()=>
    {
        login.loginwithOTP(Cypress.env('username'));
        cy.visit(Cypress.config('baseUrl')+'/listing/'+(Cypress.env('event_car_id')))
        event.listing_buy_online();
    })

    it('when clicking Buy Online in intro page', ()=>
    {
        login.loginwithOTP(Cypress.env('username'));
        cy.visit(Cypress.config('baseUrl')+'/start/'+(Cypress.env('event_car_id')))
        event.intro_checkout();
    })

    it('when creating a lead', ()=>
    {
        login.loginwithOTP(Cypress.env('username'));
        cy.visit(Cypress.config('baseUrl')+'/listing/'+(Cypress.env('event_car_id')))
        event.listing_lead();
    })

})
}