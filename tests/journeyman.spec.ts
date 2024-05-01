import { test } from '@playwright/test';
import { JourneymanContext } from "../context/journeyman-context";

test.describe("A Journeyman's Travels - Older Post Warning",()=>{
    let _context: JourneymanContext;
    test.beforeEach(async ({page})=>{
        _context = new JourneymanContext(page);
        await _context.OnTheArchivePage();
    });

    test("Older Posts Should Display Temporal Warning",async ()=>{
        const today = new Date();
        const atLeast3YearsAgo = today.getFullYear()-3;
        const oldPost = await _context.Given_Post_From(atLeast3YearsAgo);

        await _context.When_Load(oldPost);
        
        await _context.Then_Display_Temporal_Warning();
    });
})