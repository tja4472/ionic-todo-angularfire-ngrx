import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

import * as FromRootReducer from '../reducers/index';
import * as TodoActions from '../actions/todo.action';

@Injectable()
export class TodoService {
    constructor(
        private store: Store<FromRootReducer.State>
    ) {
    }

    clearCompletedItems() {
        this.store.dispatch(
            new TodoActions.ClearCompletedAction()
        );
    }

    getData(): Observable<ToDo[]> {
        return this.store.let(FromRootReducer.getTodo_GetTodos);
    }

    initialise(): void {
        this.store.dispatch(
            new TodoActions.LoadAction());
    }

    isLoaded(): Observable<boolean> {
        return this.store.let(FromRootReducer.getTodo_GetLoaded);
    }

    isLoading(): Observable<boolean> {
        return this.store.let(FromRootReducer.getTodo_GetLoading);
    }

    reorderItems(indexes: Indexes) {
        this.store.dispatch(
            new TodoActions.ReorderListAction(indexes));
    }

    remove(todo: ToDo) {
        this.store.dispatch(
            new TodoActions.RemoveAction(todo.$key));
    }

    save(todo: ToDo) {
        this.store.dispatch(
            new TodoActions.SaveAction(todo));
    }
}
