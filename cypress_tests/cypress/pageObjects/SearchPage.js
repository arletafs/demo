import * as search from '../locators/search_page.locators'
import * as homepage from '../locators/homepage.locators'


import 'cypress-wait-until';

class SearchPage{

    search_tag(){
        return cy.get('seez-sdk-search').shadow().find('.tags')
    }

    listing_list(){
      return cy.get('seez-sdk-search').shadow().find(search.listing_list)
    }

    clear_filter(){
      return cy.get('seez-sdk-search').shadow().find(search.clear_filter).click()
    }

    fuel_type(){
      return cy.get('seez-sdk-search').shadow().find(search.fuel_type)
    }

    body_type(){
      return cy.get('seez-sdk-search').shadow().find(search.body_type)
    }
    
    open_search_page(){
        cy.get(homepage.hero_search_button).click()
        
        //assertions
        this.listing_list().should('exist')
    }

    by_text(){
        cy.get('seez-sdk-search').shadow()
          .find(search.search_field)
          .clear()
          .type('A200', { force: true })

        //assertions
        this.search_tag().should('include.text', 'A200')
        this.listing_list()
          .each($card => {
            expect($card.text()).to.include('A200')
        })

        //remove text search
        cy.get('seez-sdk-search').shadow()
          .find(search.search_field)
          .clear( { force: true })

    }

    by_make(){
      //by make
      cy.get('seez-sdk-search').shadow()
        .find(search.car_make).click()
        .contains('BMW').click()

      //assertions
      this.search_tag().should('include.text', 'BMW')
      this.listing_list()
        .each($card => {
          expect($card.text()).to.include('BMW')
      })
  }

    by_model(){

        //by make
        cy.get('seez-sdk-search').shadow()
          .find(search.car_make).click()
          .contains('BMW').click()

        //by model family
        cy.get('seez-sdk-search').shadow()
          .find(search.car_model).click()
          .contains('1-Serie').click()

        //assertions
        this.search_tag().should('include.text', 'BMW')
        this.search_tag().should('include.text', '1-Serie')
        this.listing_list()
          .each($card => {
            expect($card.text()).to.satisfy((text) => {
              return text.includes('BMW 1') || text.includes('BMW M');
            })
        })

        //more than 1 model families
        cy.get('seez-sdk-search').shadow()
          .contains('2-Serie').click()
        cy.get('seez-sdk-search').shadow()
          .find(search.car_model).click()
        
        //assertions
        this.search_tag().should('include.text', 'BMW')
        this.search_tag().should('include.text', '1-Serie')
        this.search_tag().should('include.text', '2-Serie')

        //close dropdown
        cy.get('seez-sdk-search').shadow()
          .find(search.car_model).click()

        this.clear_filter()
    }

    by_year(){
        cy.get('seez-sdk-search').shadow()
          .find(search.year_from).click()
          .contains('2022').click()
        
        cy.get('seez-sdk-search').shadow()
          .find(search.year_to).click()
          .contains('2022').click()

        //assertions
        this.search_tag().contains('mellem 2022 og 2022')

        this.clear_filter()
        
        //assertion
        this.search_tag().should('not.include.text', 'mellem 2022 og 2022')        
        }

    by_kilometrage(){
      cy.get('seez-sdk-search').shadow()
        .find(search.kilometrage).click()
        .type('10000')

      //assertions
      this.search_tag().contains('10.000 km')
        
      cy.get('seez-sdk-search').shadow() //remove filter
        .find(search.kilometrage).click()
        .clear()
      }

    by_fuel_type(){
      //benzin
      this.fuel_type().click()
          .contains('Benzin').click()
      //assertions
      this.search_tag().contains('Benzin')
      this.listing_list()
          .each($card => {
          expect($card.text()).to.include('Benzin')
      })  
      //close dropdown
      this.fuel_type().click()
      this.clear_filter()

     //diesel
     this.fuel_type().click()
        .contains('Diesel').click()
      this.search_tag().contains('Diesel')
      this.listing_list()
          .each($card => {
          expect($card.text()).to.include('Diesel')
        })
      this.clear_filter()
      
      //hybrid benzin
      this.fuel_type().click()
          .contains('Hybrid (Benzin)').click()
      this.search_tag().contains('Hybrid (Benzin)')
      this.listing_list()
        .each($card => {
          expect($card.text()).to.include('Hybrid (Benzin)')
        })
        this.clear_filter()
        
      //hybrid diesel
      this.fuel_type().click()
          .contains('Hybrid (Diesel)').click()
      this.search_tag().contains('Hybrid (Diesel)')
      this.listing_list()
        .each($card => {
          expect($card.text()).to.include('Hybrid (Diesel)')
        })
        this.clear_filter()
      }

      by_transmission(){
        cy.get('seez-sdk-search').shadow()
          .find(search.transmission).click()
          .contains('Automatisk').click()

        //assertions
        this.search_tag().contains('Automatisk')
        
        //close dropdown
        cy.get('seez-sdk-search').shadow()
          .find(search.transmission).click()
        
          this.clear_filter()
    }

    by_body_type(){
      //Stationcar
      this.body_type().contains('Stationcar').click()
      //assertions
      this.search_tag().contains('Stationcar')
      this.clear_filter()
  }

    by_engine_size(){
      cy.get('seez-sdk-search').shadow()
        .find(search.engine).click()
        .contains('3.0 L').click()

      //assertions
      this.search_tag().contains('3.0 L')
      
      this.clear_filter()

      //assertions
      this.search_tag().should('not.include.text', '3.0 L')
    }

    by_drive_type(){
      cy.get('seez-sdk-search').shadow()
        .find(search.drive_type).click()
        .contains('4-hjulstræk ').click()

      //assertions
      this.search_tag().contains('4-hjulstræk ')
      
      this.clear_filter()

      //assertions
      this.search_tag().should('not.include.text', '4-hjulstræk ')
    }

    by_color(){
      //Grå
      cy.get('seez-sdk-search').shadow()
        .find(search.colors).click()
        .contains('Grå').click()

      //assertions
      this.search_tag().contains('Grå ')
      
      this.clear_filter()
    }

    by_number_of_doors(){
      cy.get('seez-sdk-search').shadow()
        .find(search.number_of_doors).click()
        .find(search.four_doors).click()

      //assertions
      this.search_tag().should('include.text', '4 døre ')
      
      this.clear_filter()
    }
      

}

export default new SearchPage()