import { Locator, Page } from "@playwright/test";

export class GoogleSearchModel {
    private readonly _url = "https://google.com/";
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    public async Visit() {
        await this.page.goto(this._url, { waitUntil: "load" }); // Go to the page this model is for.
        await this.QueryBox.waitFor(); // Wait for the page to be interactable.
    }

    private readonly boxIdAsOf20240503 = "APjFqb"
    get QueryBox(): Locator {
        return this.page.locator(`textarea[id=${this.boxIdAsOf20240503}]`);
    }

}