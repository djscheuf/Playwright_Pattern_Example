import { Locator, Page } from "@playwright/test";

export class WikipediaSourceModel {
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    get BodyContent(): Locator {
        return this.page.locator("div[id=bodyContnet]");
    }

    get SourceInfo(): Locator {
        return this.BodyContent.locator("div[id=mw-content-text]").locator("p");
    }

}