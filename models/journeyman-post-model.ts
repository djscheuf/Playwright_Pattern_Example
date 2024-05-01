import { Page } from "@playwright/test";

export class JourneymanPostModel {
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    get TemporalWarning(){
        return this.page.locator('.age-warning');
    }

}