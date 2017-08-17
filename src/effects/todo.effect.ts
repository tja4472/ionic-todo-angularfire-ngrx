import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers';

import * as TodoAction from '../actions/todo.action';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';
import { IToDo } from '../models/todo';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,
    private fb1DataService: Fb1DataService,
    private todoDataService: TodoDataService
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) clearCompleted$ = this.actions$
    .ofType(TodoAction.CLEAR_COMPLETED)
    .withLatestFrom(this.state$)
    .do(([, state]) => {
      const completed = state.todo.todos.filter((a) => a.isComplete);
      this.fb1DataService.clearCompletedTodos(completed);
    });
/*
  @Effect() clearCompleted$ = this.updates$
    .whenAction(ToDoActions.CLEAR_COMPLETED)
    .do(x => {
      let completed = x.state.todo.todos.filter(a => a.isComplete);
      this.fb1DataService.clearCompletedTodos(completed);
    })
    // Terminate effect.
    .ignoreElements();
*/

  // tslint:disable-next-line:member-ordering
  @Effect() loadCollection$ = this.actions$
    .ofType(TodoAction.LOAD)
    .do((x) => { console.log('Effect:loadCollection$:A', x); })
    .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(() => this.todoDataService.getData())
    .do((x) => { console.log('Effect:loadCollection$:B', x); })
    .map((items: IToDo[]) => new TodoAction.LoadSuccessAction(items));


/*
  @Effect() loadCollection$ = this.updates$
    .whenAction(ToDoActions.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })
    .filter(x => x.state.login.isAuthenticated)

    // Watch database node and get items.
    .switchMap(x => this.todoDataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
  // Terminate effect.
  // .ignoreElements());
*/
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) reorderList$ = this.actions$
    .ofType(TodoAction.REORDER_LIST)
    .withLatestFrom(this.state$)
    .map(([action, state]) => ({ action: action as TodoAction.ReorderListAction, state }))
    .do((x) => {
      console.log('Effect:reorderList$:A', x);
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload,
        x.state.todo.todos);
    });
/*
  @Effect() reorderList$ = this.updates$
    .whenAction(ToDoActions.REORDER_LIST)
    .do(x => {
      console.log('Effect:reorderList$:A', x);
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload.indexes,
        x.state.todo.todos);
    })

    // Terminate effect.
    .ignoreElements();
*/

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeItem$ = this.actions$
    .ofType(TodoAction.REMOVE)
    .map((action: TodoAction.RemoveAction) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.todoDataService.removeItem(payload);
    });

/*
  @Effect() removeItem$ = this.updates$
    .whenAction(ToDoActions.REMOVE)
    .do(x => {
      console.log('Effect:removeItem$:A', x);
      this.todoDataService.removeItem(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();
*/
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) save$ = this.actions$
    .ofType(TodoAction.SAVE)
    .map((action: TodoAction.SaveAction) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.todoDataService.save(payload);
    });
/*
  @Effect() save$ = this.updates$
    .whenAction(ToDoActions.SAVE)
    .do(x => {
      console.log('Effect:save$:A', x);
      this.todoDataService.save(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();
}
*/
}
