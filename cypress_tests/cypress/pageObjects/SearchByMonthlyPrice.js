import * as search from '../locators/search_page.locators'
import * as listing from '../locators/listing_page.locators'


import 'cypress-wait-until';

class SearchByMonthlyPrice{

    calculator(){
      return cy.get('seez-sdk-calculator').shadow()
    }

    search_tag(){
      return cy.get('seez-sdk-search').shadow().find('.tags')
    }

    apply_search(){
      //by monthly price
      cy.get('seez-sdk-search').shadow()
        .find(search.payment_types)
        .contains('Finansiering').click()
      cy.get('seez-sdk-search').shadow()
        .find(search.min_price).type('2000', { force: true })
      this.search_tag().contains('2.000')
      cy.get('seez-sdk-search').shadow()
        .find(search.max_price).type('5000', { force: true } )
      this.search_tag().contains('between 2.000 kr. og 5.000 kr.')

        cy.get('seez-sdk-search').shadow()
          .find(search.listing_list)
          .each($car => {
            cy.get('seez-sdk-search').shadow()
              .find($car)
              .find('.priceWrapper').first()
              .then(($monthly) => {
                const price = $monthly.text().replace(/\D/g,'');
                expect(parseInt(price)).to.be.gte(2000)
                expect(parseInt(price)).to.be.lte(5000)
              })
          })
          
          
      
    }

    view_listing_detail(){
      cy.get('seez-sdk-search').shadow()
        .find(search.listing_card_0).click()
      cy.wait(2000)

      //assertions
      cy.get(listing.emi_price).first()
        .then(($price) => {
        const monthly = $price.text().replace(/\D/g,'');
        expect(parseInt(monthly)).to.be.gte(2000)
        expect(parseInt(monthly)).to.be.lte(5000)
      })
    }

}

export default new SearchByMonthlyPrice()