import { test } from '@playwright/test';
import { GoogleContext } from '../context/google.contex';


test.describe("Google - Quick Results",()=>{
    let _context: GoogleContext;
    test.beforeEach(async ({page})=>{
        _context = new GoogleContext(page);
        await _context.OnSearchPage();
    });

    test("Historical Figures should get quick results",async ()=>{
        await _context.Given_Query_For("George Washington");
        await _context.When_Search();
        await _context.Then_I_Get_Direct_Answers();
        await _context.Then_Those_Answers_Match_Their_Source();
    });
})