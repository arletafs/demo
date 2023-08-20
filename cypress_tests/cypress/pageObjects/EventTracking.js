import * as search from '../locators/search_page.locators'
import * as listing from '../locators/listing_page.locators'
import * as lead from '../locators/create_lead.locators'

import 'cypress-wait-until';

class EventTracking {

	search_sdk() {
		return cy.get('seez-sdk-search').shadow()
	}

	lead_sdk() {
		return cy.get('seez-sdk-lead-modal').shadow()
	}

	search_tag() {
		return cy.get('seez-sdk-search').shadow().find('.tags')
	}

	go_to_search_page() {
		cy.visit(Cypress.config('baseUrl') + '/find-brugt-bil')
		this.search_sdk().find(search.listing_card_0) //wait until page is loaded
	}

	search_page_text(keyword) {
    const triggerEvent = () => {
      this.search_sdk()
          .find(search.search_field)
          .clear()
          .type(keyword, {force: true})
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
              //'context.page.search': '?free-text=test&sort=-attractiveness',  
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              //'context.page.search': '?free-text=test&sort=-attractiveness', 
              //'context.traits': {}, 
            }
          ]

          cy.performActionAndVerifyEvents(triggerEvent, 'search_result', loginTrue, loginFalse);
	}

	search_favourite() {
    const triggerEvent = () => {
      this.search_sdk()
					.find(search.like_button).click()
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),  
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'favourite_car', loginTrue, loginFalse)
	}

	search_car_click() {
    const triggerEvent = () => {
      this.search_sdk()
					.find(search.listing_card_0).click()
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.vehicle.model.family.brand.name': Cypress.env('event_car_brand'),
              'properties.vehicle.name': Cypress.env('event_car_name'),
              'properties.vehicle.variant': Cypress.env('event_car_variant'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.vehicle.model.family.brand.name': Cypress.env('event_car_brand'),
              'properties.vehicle.name': Cypress.env('event_car_name'),
              'properties.vehicle.variant': Cypress.env('event_car_variant'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'car_click', loginTrue, loginFalse)
	}

	listing_favourite() {
    const triggerEvent = () => {
      cy.get(listing.like_button).click()
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'favourite_car', loginTrue, loginFalse)
	}

	listing_buy_online() {
    const triggerEvent = () => {
      cy.get(listing.buy_online).first().click()
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.vehicleData.vehicle_brand_name': Cypress.env('event_car_brand'),
              'properties.vehicleData.vehicle_model_name': Cypress.env('event_car_model'),
              'properties.vehicleData.vehicle_variant': Cypress.env('event_car_variant'),
              'properties.vehicleData.vehicle_body_type': Cypress.env('event_car_body_type'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.vehicleData.vehicle_brand_name': Cypress.env('event_car_brand'),
              'properties.vehicleData.vehicle_model_name': Cypress.env('event_car_model'),
              'properties.vehicleData.vehicle_variant': Cypress.env('event_car_variant'),
              'properties.vehicleData.vehicle_body_type': Cypress.env('event_car_body_type'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'add_to_cart', loginTrue, loginFalse)
	}

	listing_lead() {
    const triggerEvent = () => {
      cy.get(lead.contact_us)
					.contains('Kontakt os').click({force: true})
        
          //enter name, email, phone if user is not logged in
        cy.readFile('cypress/fixtures/data.json').then((jsonData) => {
          const isLogin = jsonData.isLogin;
            if (isLogin === false) { 
              this.lead_sdk().find(lead.first_name).type(Cypress.env('event_first_name'), { force: true });
              this.lead_sdk().find(lead.middle_name).type(Cypress.env('event_middle_name'), { force: true });
              this.lead_sdk().find(lead.last_name).type(Cypress.env('event_last_name'), { force: true });
              this.lead_sdk().find(lead.email).type(Cypress.env('event_email'), { force: true });
              this.lead_sdk().find(lead.phone_number).type(Cypress.env('event_phone_number'), { force: true });
            }
          })

				this.lead_sdk()
					.find(lead.comments).type(Cypress.env('event_lead_comment'), {force: true})
				this.lead_sdk()
					.find(lead.terms).click({force: true})
				this.lead_sdk()
					.find(lead.terms_policy).click({force: true})
				this.lead_sdk()
					.find(lead.submit).click({force: true})  
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.leadData.firstName': Cypress.env('event_first_name'),
              'properties.leadData.lastName': Cypress.env('event_last_name'),
              'properties.leadData.comments': Cypress.env('event_lead_comment'),
              'properties.details.id': `${Cypress.env('event_car_id')}`,
              'properties.details.name': Cypress.env('event_car_name'),
              'properties.details.year': Cypress.env('event_car_year'),
              'properties.details.dealership.name': Cypress.env('event_car_dealer'),   
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              'properties.leadData.firstName': Cypress.env('event_first_name'),
              'properties.leadData.lastName': Cypress.env('event_last_name'),
              'properties.leadData.comments': Cypress.env('event_lead_comment'),
              'properties.details.id': `${Cypress.env('event_car_id')}`,
              'properties.details.name': Cypress.env('event_car_name'),
              'properties.details.year': Cypress.env('event_car_year'),
              'properties.details.dealership.name': Cypress.env('event_car_dealer'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'lead_sent', loginTrue, loginFalse)
	}

  intro_checkout() {
    const triggerEvent = () => {
      cy.get('.checkoutStickyContainer')
				.contains('Start Checkout').click()
    }
    const loginTrue = [ //expected event properties when user is logged in 
            {
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: Cypress.env('event_user_id'),
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.listing_make': Cypress.env('event_car_brand'),
              'properties.listing_model': Cypress.env('event_car_model'),
              'properties.listing_variant': Cypress.env('event_car_variant'),
              'properties.listing_body_type': Cypress.env('event_car_body_type'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits.name': Cypress.env('event_full_name'),
              //'context.traits.email': Cypress.env('event_email'),
              //'context.traits.hashedEmail': Cypress.env('event_hashed_email'),
              //'context.traits.phone': Cypress.env('event_phone_number'),
              //'context.traits.marketing_consent': Cypress.env('event_marketing_consent'),
            }
          ]
    const loginFalse = [ //expected event properties when user is not logged in 
						{
              type: 'track',
              timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              anonymousId: /^.+$/,
              //userId: null,
              'properties.clientId': 'mp',
              'properties.listing_id': Cypress.env('event_car_id'),
              'properties.listing_make': Cypress.env('event_car_brand'),
              'properties.listing_model': Cypress.env('event_car_model'),
              'properties.listing_variant': Cypress.env('event_car_variant'),
              'properties.listing_body_type': Cypress.env('event_car_body_type'),
              'properties.listing_price': Cypress.env('event_car_price'),
              //'context.traits': {},
            }
          ]

		cy.performActionAndVerifyEvents(triggerEvent, 'start_checkout_button', loginTrue, loginFalse)
	}

}

export default new EventTracking()