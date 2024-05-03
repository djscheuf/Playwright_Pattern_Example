import { Page, expect, Locator } from "@playwright/test";

export class GoogleContext {
    private page: Page;
    private _searchPageModel: GoogleSearchModel;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    async OnSearchPage(){
        this._searchPageModel = new GoogleSearchModel(this.page);
        await this._searchPageModel.Visit();
    }

    async Given_Query_For(queryText: string){
        this._searchPageModel.queryBox.fill(queryText);
    }

    async When_Search(){
        this._searchPageModel.press("Enter");
    }

    async Then_I_Get_Direct_Answers(){
        expect(true).toBe(false);
    }
    
    
    async Then_I_Get_Direct_Answers(){
        expect(true).toBe(false);
    }
}