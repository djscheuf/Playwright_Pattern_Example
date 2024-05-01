import { Page } from "@playwright/test";

export class JourneymanPostModel {
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

}