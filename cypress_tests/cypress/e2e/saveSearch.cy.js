import search from '../pageObjects/SearchPage';
import save_search from '../pageObjects/SaveSearch';
import login from '../pageObjects/LoginPage';

describe ('As a user I shoud be able to save search', ()=>
{
    it('so that I address it on My Profile', ()=>
    {
        //save search as an anon user
        search.open_search_page();
        save_search.apply_filters();
        save_search.save_search();
        save_search.view_search_list();
        save_search.open_saved_search();

        //save search as a logged in user
        login.loginwithOTP(Cypress.env('username'));
        save_search.view_search_list();
        save_search.delete_saved_search();
        save_search.see_all_cars();
        save_search.apply_filters();
        save_search.save_search();
        save_search.view_search_list();
        save_search.open_saved_search();
        save_search.view_search_list();
        save_search.delete_saved_search();
        login.logout();

    })
    
})