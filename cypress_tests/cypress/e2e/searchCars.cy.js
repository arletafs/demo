import search from '../pageObjects/SearchPage';
import event from '../pageObjects/EventTracking';



describe ('As a user I shoud be open search page', ()=>
{
    it('so that I can search based on some filters', ()=>
    {
        search.open_search_page();
        search.by_text();
        search.by_model();
        search.by_year();
        search.by_kilometrage();
        search.by_fuel_type();
        search.by_transmission();
        search.by_body_type();
        search.by_engine_size();
        search.by_color();
        search.by_number_of_doors();
    })
    
})