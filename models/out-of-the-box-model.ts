import { Page } from "@playwright/test";

export class OutOfTheBoxModel {
    private readonly _url = "https://demo.playwright.dev/todomvc";
    private readonly page:Page;

    constructor(givenPage:Page){
        this.page = givenPage;
    }

    public async Visit() {
        await this.page.goto(this._url, { waitUntil: "load" }); // Go to the page this model is for.
        await this.newTodoEntry.waitFor(); // Wait for the page to be interactable.
    }

    get newTodoEntry(){
        return this.page.getByPlaceholder('What needs to be done?');
    }

    get AllTodos(){
        return this.page.getByTestId('todo-title');
    }
}