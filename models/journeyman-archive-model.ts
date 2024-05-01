import { Page } from "@playwright/test";

export class JourneymanArchiveModel {
    private readonly _url = "https://daniel.scheufler.io/archives/";
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    public async Visit() {
        await this.page.goto(this._url, { waitUntil: "load" }); // Go to the page this model is for.
         // Wait for the page to be interactable.
    }

}