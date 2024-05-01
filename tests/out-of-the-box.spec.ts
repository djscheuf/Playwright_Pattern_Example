import { test } from '@playwright/test';
import { OutOfTheBoxContext } from '../context/out-of-the-box-context';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo - Refactored',()=>{
  

  // beforeEach should put test ON the ToDoApp screen.
  let _context: OutOfTheBoxContext;
  test.beforeEach(async ({page})=>{
    _context = new OutOfTheBoxContext(page);

    await _context.OnToDoAppPage();
    await _context.clearExistingTodos();
    await _context.Then_Total_ToDos_In_LocalStorage_Should_Be(0);
  });

  test('Add One ToDo', async ({page})=> {
    await _context.Given_A_Draft_Todo_Of(TODO_ITEMS[0]);
    await _context.When_Add_Todo();
    await _context.Then_Todos_Should_Contain([TODO_ITEMS[0]]);
    await _context.Then_Input_Cleared_For_Next_Entry();
    await _context.Then_Total_ToDos_In_LocalStorage_Should_Be(1);
  })

  test('Add Many ToDos', async ({page})=> {
    const exampleTodoCount = TODO_ITEMS.length;
    for(let i=0; i++; i<exampleTodoCount-1){
      await _context.Given_A_Todo_of(TODO_ITEMS[i])
    }
    await _context.Given_A_Draft_Todo_Of(TODO_ITEMS[TODO_ITEMS.length-1]);

    await _context.When_Add_Todo();

    await _context.Then_Todos_Should_Contain(TODO_ITEMS);
    await _context.Then_Input_Cleared_For_Next_Entry();
    await _context.Then_Total_ToDos_In_LocalStorage_Should_Be(exampleTodoCount);
    await _context.Then_Todos_Appear_In_Order(TODO_ITEMS);
  })
});
