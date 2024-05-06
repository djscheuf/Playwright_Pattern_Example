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
        await this._resultsPageModel.MainBody.waitFor();
        await this._resultsPageModel.DirectAnswersColumn.waitFor();
    }

    async Then_I_Get_Direct_Answers(){
        const answer = await this._resultsPageModel.DirectAnswers();
        expect(answer).toBeVisible();
    }
    
    
    async Then_Those_Answers_Match_Their_Source(queryText: string){
        // capture content to Test
        const answer = await this._resultsPageModel.DirectAnswers();
        const directAnswerText = await answer.textContent() || ""; 
        const directAnswerLessQuery = directAnswerText.slice(queryText.length,directAnswerText.length-1);
        expect(directAnswerLessQuery).toBeTruthy(); 

        // get Navigation Link
        const sourceLink = await this._resultsPageModel.DirectAnswerSource()
        expect(sourceLink).toBeTruthy(); 

        // Navigate to source
        await sourceLink.click(); 
        const sourceModel = new WikipediaSourceModel(this.page)
        await sourceModel.BodyContent.waitFor()

        // verify content against source
        const sourceInfo = await sourceModel.SourceInfo(queryText);
        const sourceText = await sourceInfo.allTextContents();
        const firstParagraph = sourceText[0];

        expect(firstParagraph.includes(directAnswerLessQuery)).toBe(true); 
    }
}