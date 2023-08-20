import retail from '../pageObjects/SearchByRetailPrice';
import search from '../pageObjects/SearchPage';
import monthly from '../pageObjects/SearchByMonthlyPrice';


describe ('As a user I shoud be able to open search page', ()=>
{

    it('so that I can search by retail price', ()=>
    {
        search.open_search_page();
        retail.apply_search();
        retail.view_listing_detail();
    })


    it('so that I can search by monthly price', ()=>
    {
        search.open_search_page();
        monthly.apply_search();
        monthly.view_listing_detail();
    })
    
})