import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { ToDoActions } from '../actions';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoEffects {
  constructor(
    private fb1DataService: Fb1DataService,
    private updates$: StateUpdates<AppState>,
    private todoActions: ToDoActions,
    private todoDataService: TodoDataService
  ) { }

  @Effect() clearCompleted$ = this.updates$
    .whenAction(ToDoActions.CLEAR_COMPLETED)
    .do(x => {
      let completed = x.state.todo.todos.filter(a => a.isComplete);
      this.fb1DataService.clearCompletedTodos(completed);
    })
    // Terminate effect.
    .ignoreElements();

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

  @Effect() removeItem$ = this.updates$
    .whenAction(ToDoActions.REMOVE)
    .do(x => {
      console.log('Effect:removeItem$:A', x);
      this.todoDataService.removeItem(
        x.action.payload);
    })

    // Terminate effect.
    .ignoreElements();

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
