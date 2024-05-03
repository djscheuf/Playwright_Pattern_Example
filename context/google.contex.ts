import { Page, expect, Locator } from "@playwright/test";
import { GoogleResultsModel } from "../models/google-results-model";
import { GoogleSearchModel } from "../models/google-search-model";
import { WikipediaSourceModel } from "../models/wikipedia-source-model";

export class GoogleContext {
    private page: Page;
    private _searchPageModel: GoogleSearchModel;
    private _resultsPageModel: GoogleResultsModel;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    async OnSearchPage(){
        this._searchPageModel = new GoogleSearchModel(this.page);
        await this._searchPageModel.Visit();
    }

    async Given_Query_For(queryText: string){
        await this._searchPageModel.QueryBox.fill(queryText);
    }

    async When_Search(){
        await this._searchPageModel.QueryBox.press("Enter");
        this._resultsPageModel = new GoogleResultsModel(this.page);
        this._resultsPageModel.SearchResults.waitFor();
    }

    async Then_I_Get_Direct_Answers(){
        await expect(this._resultsPageModel.DirectAnswers).toBeVisible();
    }
    
    
    async Then_Those_Answers_Match_Their_Source(){
        const directAnswerText = await this._resultsPageModel.DirectAnswers.textContent() || ""; // capture content to Test

        expect(directAnswerText).toBeTruthy(); // ensure got content

        this._resultsPageModel.DirectAnswerSource.click(); // Navigate to source
        const sourceModel = new WikipediaSourceModel(this.page)
        expect(sourceModel.SourceInfo).toContainText(directAnswerText); // verify content against source

    }
}