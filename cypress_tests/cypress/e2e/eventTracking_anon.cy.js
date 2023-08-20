import event from '../pageObjects/EventTracking';

if (Cypress.config("baseUrl") == "https://cypress.dev-test.co") { //run in dev only, because it's not implemented in staging

describe ('Verifying tracking event as an anon user', ()=>
{

    it('when searching by text then favourite a car', ()=>
    {
        event.go_to_search_page();
        event.search_page_text(Cypress.env('event_car_ref'));
        event.search_favourite();
        event.search_car_click();
        event.listing_favourite();
    })

    it('when clicking Buy Online', ()=>
    {
        cy.visit(Cypress.config('baseUrl')+'/listing/'+(Cypress.env('event_car_id')))
        event.listing_buy_online();
    })

    it('when creating a lead', ()=>
    {
        cy.visit(Cypress.config('baseUrl')+'/listing/'+(Cypress.env('event_car_id')))
        event.listing_lead();
    })

})
}