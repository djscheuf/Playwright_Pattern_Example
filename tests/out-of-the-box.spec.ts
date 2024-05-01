import { test, expect, type Page } from '@playwright/test';
import { OutOfTheBoxContext } from '../context/out-of-the-box-context';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo - Refactored',()=>{
  
  test('Add One ToDo', async ({page})=> {
    const _context = new OutOfTheBoxContext(page);
    await _context.Given_A_Draft_Todo_Of(TODO_ITEMS[0]);
    await _context.When_Add_Todo();
    await _context.Then_Todos_Should_Contain([TODO_ITEMS[0]]);
    await _context.Then_Input_Cleared_For_Next_Entry();
    await _context.Then_Total_ToDos_In_LocalStorage_Should_Be(1);
  })

  test('Add Many ToDos', async ({page})=> {
    const _context = new OutOfTheBoxContext(page);

    const exampleTodoCount = TODO_ITEMS.length;
    for(let i=0; i++; i<exampleTodoCount-1){
      await _context.Given_A_Todo_of(TODO_ITEMS[i])
    }
    await _context.Given_A_Draft_Todo_Of(TODO_ITEMS[TODO_ITEMS.length-1]);

    await _context.When_Add_Todo();

    await _context.Then_Todos_Should_Contain(TODO_ITEMS);
    await _context.Then_Input_Cleared_For_Next_Entry();
    await _context.Then_Total_ToDos_In_LocalStorage_Should_Be(exampleTodoCount);
  })
});

test.describe('New Todo', () => {
  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')
  
    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(todoCount).toHaveText('3 items left');
    await expect(todoCount).toContainText('3');
    await expect(todoCount).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});


async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}
