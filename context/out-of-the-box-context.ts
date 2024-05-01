import { Browser, Page, expect } from "@playwright/test";
import { OutOfTheBoxModel } from "../models/out-of-the-box-model";

export class OutOfTheBoxContext {
    private _pageModel: OutOfTheBoxModel;
    private page: Page;

    constructor(givenPage:Page){
        this.page = givenPage;
        this._pageModel = new OutOfTheBoxModel(givenPage);
    }

    async OnToDoAppPage() {
        // use of this method may need to change, as visiting the page is the trigger for the login action.
        this._pageModel = new OutOfTheBoxModel(this.page);
        await this._pageModel.Visit();
        return this;
    }

    async clearExistingTodos(){
        return await this.page.waitForFunction(() => {
            localStorage['react-todos'] = [];
        });
    }

    async Given_A_Draft_Todo_Of(todoText: string){
       await this._pageModel.newTodoEntry.fill(todoText);
    }

    async When_Add_Todo(){
        await this._pageModel.newTodoEntry.press("Enter");
    }

    async Given_A_Todo_of(todoText:string){
        await this.Given_A_Draft_Todo_Of(todoText);
        await this.When_Add_Todo();
    }

    async Then_Todos_Should_Contain(theseTodos: string[]){
        await expect(this._pageModel.AllTodos).toHaveText(theseTodos);
    }

    async Then_Input_Cleared_For_Next_Entry(){
        await expect(this._pageModel.newTodoEntry).toBeEmpty();
    }

    async Then_Total_ToDos_In_LocalStorage_Should_Be(expected:number){
        return await this.page.waitForFunction(e => {
            return JSON.parse(localStorage['react-todos']).length === e;
          }, expected);
    }
    
    async Then_Todos_Appear_In_Order(thisOrderedArray: string[]){
        const allTodos = await this._pageModel.AllTodos.all();
        thisOrderedArray.forEach((entry, index) =>{
            expect(allTodos[index]).toHaveText(entry);
        });

    }
}