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
        return this.MainBody.locator("div[id=search].span",{has:this.MainBody.locator("a")});
    }

    get DirectAnswersColumn(): Locator {
        return this.page.locator("div[id=rhs]");
    }

    get DirectAnswers():Locator {
        return this.DirectAnswersColumn.locator("div[id=kno-rdesc]").locator("span")[0]
    }

    get DirectAnswerSource():Locator {
        return this.DirectAnswersColumn.locator("div[id=kno-rdesc]").locator("a")
    }


}