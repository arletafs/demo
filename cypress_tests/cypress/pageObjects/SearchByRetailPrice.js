import * as search from '../locators/search_page.locators'
import * as listing from '../locators/listing_page.locators'


import 'cypress-wait-until';

class SearchByRetailPrice{

    calculator(){
      return cy.get('seez-sdk-calculator').shadow()
    }

    search_tag(){
      return cy.get('seez-sdk-search').shadow().find('.tags')
    }
    
    open_page(){
        cy.visit(Cypress.config().baseUrl);
    }

    apply_search(){
      //by retail price
      cy.get('seez-sdk-search').shadow()
        .find(search.payment_types)
        .contains('Kontant').click()
      cy.get('seez-sdk-search').shadow()
        .find(search.min_price).type('300000', { force: true })
      this.search_tag().contains('300.000')
      cy.get('seez-sdk-search').shadow()
        .find(search.max_price).type('900000', { force: true } )
      this.search_tag().contains('between 300.000 kr. og 900.000 kr.')
      //by transmission
      cy.get('seez-sdk-search').shadow()
        .find(search.transmission).click()
        .contains('Automatisk').click()
      cy.get('seez-sdk-search').shadow() //close dropdown
        .find(search.transmission).click()
      //by color
      cy.get('seez-sdk-search').shadow()
        .find(search.colors).click()
        .contains('Grå').click()

      //assertions
      cy.get('seez-sdk-search').shadow()
        .find(search.car_card_retail_price)
        .each($car => {
          const price = $car.text().replace(/\D/g,'');
          expect(parseInt(price)).to.be.gte(300000)
          expect(parseInt(price)).to.be.lte(900000)
        })
      
    }

    view_listing_detail(){
      cy.get('seez-sdk-search').shadow()
        .find(search.listing_card_0).click()

      //assertions
      cy.get(listing.car_price).first()
        .then(($price) => {
        const retail_price = $price.text().replace(/\D/g,'');
        expect(parseInt(retail_price)).to.be.gte(300000)
        expect(parseInt(retail_price)).to.be.lte(900000)
      })
      
      cy.get(listing.main_details).should('include.text', 'Automatisk')
      cy.get(listing.main_details).should('include.text', 'Grå')
    }

}

export default new SearchByRetailPrice()