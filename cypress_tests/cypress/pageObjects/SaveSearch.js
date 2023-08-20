import * as search from '../locators/search_page.locators'
import * as my_profile from '../locators/my_profile.locators'

import 'cypress-wait-until';

class SaveSearch{

    apply_filters(){
        //by text
        cy.get('seez-sdk-search').shadow()
          .find(search.search_field)
          .type('Mustang', { force: true })

        //by model family
        cy.get('seez-sdk-search').shadow()
          .find(search.car_make).click()
          .contains('Ford').click()

        //by year
        cy.get('seez-sdk-search').shadow()
          .find(search.year_from).click()
          .contains('2022').click()
        cy.get('seez-sdk-search').shadow() //close dropdown
          .find(search.year_from).click()

        //sorting
        cy.get('seez-sdk-search').shadow()
          .find(search.sorting).click()
          .find(search.lowest_price).click()
        cy.get('seez-sdk-search').shadow() //close dropdown
          .find(search.sorting).click()
    }
  
    save_search(){
        cy.get('seez-sdk-search').shadow()
          .find(search.save_search).click()
        cy.get('seez-sdk-search').shadow()
          .find(search.save_name).type('Cypress Saved Search')
        cy.get('seez-sdk-search').shadow()
          .find(search.save_button).click()
    }

    view_search_list(){
        cy.get(my_profile.my_profile).eq(1).click()
        cy.get(my_profile.saved_search).click({force: true})

        //assertions
        cy.get('seez-sdk-saved-searches').shadow()
          .find(my_profile.search_list)
          .each($card => {
            expect($card.text()).to.include('Cypress Saved Search')
          })
    }
    
    open_saved_search(){
        cy.get('seez-sdk-saved-searches').shadow()
          .find(my_profile.search_list)
          .contains('Cypress Saved Search')
          .click()

        //assertions
        cy.get('seez-sdk-search').shadow()
          .find('.tags')
          .contains('Mustang')
        cy.get('seez-sdk-search').shadow()
          .find('.tags')
          .contains('Ford')
        cy.get('seez-sdk-search').shadow()
          .find(search.listing_list)
          .each($card => {
            expect($card.text()).to.include('Ford Mustang')
        })

        //assertions year
        cy.get('seez-sdk-search').shadow()
          .find('.tags')
          .contains('2022 eller nyere ')

        /*assertions sorting
        cy.get('seez-sdk-search').shadow()
          .find(search.sorting)
          .contains('Pris: Fra lavest til højest')*/
    }

    delete_saved_search(){
      cy.get('seez-sdk-saved-searches').shadow()
          .find(my_profile.search_list)
          .find('button').click()
      
      //assertions
      cy.get('seez-sdk-saved-searches').shadow()
        .should('include.text', 'Her er ikke noget!')
    }

    see_all_cars(){
      cy.get('seez-sdk-saved-searches').shadow()
          .contains('Søg nu').click()
      
      //assertions
      cy.get('seez-sdk-search').shadow()
        .find(search.listing_list).should('exist')
    }
}

export default new SaveSearch()