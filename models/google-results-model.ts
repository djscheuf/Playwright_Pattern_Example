import { Locator, Page } from "@playwright/test";

export class GoogleResultsModel {
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    get MainBody(): Locator {
        return this.page.getByRole("main");
    }

    get SearchResults():Locator {
        return this.MainBody.locator("div[id=search] span");
    }

    get DirectAnswersColumn(): Locator {
        return this.page.locator("div[id=rhs]");
    }

    async DirectAnswers(): Promise<Locator> {
        return await this.DirectAnswersColumn
            .locator("div span")
            .first();
    }

    async DirectAnswerSource():Promise<Locator> {
        return this.DirectAnswersColumn
        .locator("div span a")
        .first();
    }


}