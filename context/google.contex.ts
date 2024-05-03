import { Page, expect, Locator } from "@playwright/test";

export class GoogleContext {
    private page: Page;
    
    constructor(givenPage:Page){
        this.page = givenPage;
    }

    async OnSearchPage(){
        return false;
    }

    async Given_Query_For(queryText: string){
        return false;
    }

    async When_Search(){
        return false;
    }

    async Then_I_Get_Direct_Answers(){
        expect(true).toBe(false);
    }
    
    
    async Then_Those_Answers_Match_Their_Source(){
        expect(true).toBe(false);
    }
}