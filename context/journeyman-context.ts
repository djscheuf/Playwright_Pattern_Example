import { Page, expect, Locator } from "@playwright/test";
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

    async Given_Post_From(givenYear: number): Promise<Locator>{
        const partialMatch = new RegExp(`${givenYear}-`);
        const linkForOlderPost = await this._archivePageModel.AllPostListings
            .filter({hasText:partialMatch})
            .getByRole("link");
        return linkForOlderPost;
    }

    async When_Load(linkForPost:Locator){
        await linkForPost.click();
        this._postPageModel = new JourneymanPostModel(this.page);
    }

    async Then_Display_Temporal_Warning(){
        expect(this._postPageModel.TemporalWarning).toBeVisible();
    }

}