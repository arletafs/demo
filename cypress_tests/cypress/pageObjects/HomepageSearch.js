import * as homepage from '../locators/homepage.locators'
import 'cypress-wait-until';

class HomepageSearch{

    verify_page()
    {
        cy.contains(homepage.sectionTitle, 'Køb håndplukkede og kvalitetstestede biler online fra Danmarks bedste forhandlere ').should('be.visible');
       
    }

    search(){
        return cy.get('seez-sdk-search').shadow()
    }

    search_by_family_model(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.car_make).click()
        cy.contains('BMW').click()
        cy.get(homepage.car_model).click()
        cy.contains('X1').click()
        cy.get(homepage.hero_search_button).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Brugte BMW')
        this.search().find('.tags').should('include.text', 'BMW')
        this.search().find('.tags').should('include.text', 'X1')
        this.search()
            .find(homepage.listing_list)
            .each($card => {
               expect($card.text()).to.include('BMW X1')
        })
    }

    search_by_model(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.car_make).click()
        cy.contains('Mercedes').click()
        cy.get(homepage.car_model).click()
        cy.contains('C300 e').click()
        cy.get(homepage.hero_search_button).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Brugte Mercedes-Benz')
        this.search().find('.tags').should('include.text', 'Mercedes')
        this.search().find('.tags').should('include.text', 'C300 e')
        this.search()
            .find(homepage.listing_list)
            .each($card => {
               expect($card.text()).to.include('Mercedes C300 e')
        })
    }

    search_by_electric(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.electric).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'El')
        this.search()
            .find(homepage.listing_list)
            .each($card => {
               expect($card.text()).to.include('El')
        })
    }

    search_by_stationcar(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.stationcar).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'Stationcar')
    }

    search_by_hatchback(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.hatchback).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'Hatchback')
    }

    search_by_suv(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.suv).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'SUV')
    }

    see_all_cars(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get('.addedCars')
          .find(homepage.see_all_cars).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
    }

    search_by_lifestyle_electric(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.lifestyle_electric).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'Hybrid (Diesel)')
        this.search().find('.tags').should('include.text', 'Plug-in Hybrid (Benzin)')
        this.search().find('.tags').should('include.text', 'El')
    }

    search_by_lifestyle_family(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.lifestyle_family).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', 'Van')
        this.search().find('.tags').should('include.text', 'MPV')
        this.search().find('.tags').should('include.text', 'SUV')
    }

    search_by_lifestyle_city(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.lifestyle_city).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', '3 døre')
    }

    search_by_lifestyle_budget(){
        cy.get('.seezHomeLink').click()
        cy.get(homepage.hero_search_button) //wait until page is loaded
        cy.get(homepage.lifestyle_budget).click()

        //assertions
        this.search().find('.SEOText').should('include.text', 'Søgeresultater')
        this.search().find('.tags').should('include.text', '250.000 k. eller mindre')
    }
}

export default new HomepageSearch()