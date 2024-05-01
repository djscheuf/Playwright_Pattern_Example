import { Browser, Page, expect } from "@playwright/test";
import { OutOfTheBoxModel } from "../models/out-of-the-box-model";

export class OutOfTheBoxContext {
    private _pageModel: OutOfTheBoxModel;
    private page: Page;

    constructor(givenPage:Page){
        this.page = givenPage;
        this._pageModel = new OutOfTheBoxModel(givenPage);
    }

    async Given_A_Draft_Todo_Of(todoText: string){
       await this._pageModel.newTodoEntry.fill(todoText);
    }

    async When_Add_Todo(){
        await this._pageModel.newTodoEntry.press("Enter");
    }

    async Then_Todos_Should_Contain(theseTodos: string[]){
        await expect(this._pageModel.AllTodos).toHaveText(theseTodos);
    }

    async Then_Input_Cleared_For_Next_Entry(){
        await expect(this._pageModel.newTodoEntry).toBeEmpty();
    }
}