import { Browser, Page, expect } from "@playwright/test";
import { JourneymanArchiveModel } from "../models/journeyman-archive-model";
import { JourneymanPostModel } from "../models/journeyman-post-model";

export class JourneymanContext {
    private _archivePageModel: JourneymanArchiveModel;
    private _postPageModel: JourneymanPostModel;
    private page: Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    async OnTheArchivePage() {
        // use of this method may need to change, as visiting the page is the trigger for the login action.
        this._archivePageModel = new JourneymanArchiveModel(this.page);
        await this._archivePageModel.Visit();
        return this;
    }

    async Given_Post_From(year: number){
        const some_url = ".";
        return some_url;
    }

    async When_Load(urlForPost:string){
        await this.page.goto(urlForPost);
        this._postPageModel = new JourneymanPostModel(this.page);
    }

    async Then_Display_Temporal_Warning(){
        expect(true).toBe(false);       
    }

}