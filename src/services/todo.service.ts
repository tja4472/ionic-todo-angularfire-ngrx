import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes';
import { Todo } from '../shared/models/todo.model';

import * as FromRootReducer from '../reducers/index';
import * as TodoActions from '../actions/todo.action';

@Injectable()
export class TodoService {
    constructor(
        private store: Store<FromRootReducer.IState>
    ) {
    }

    clearCompletedItems() {
        this.store.dispatch(
            new TodoActions.ClearCompletedAction()
        );
    }

    getData(): Observable<Todo[]> {
        return this.store.select(FromRootReducer.getTodo_GetTodos);
    }

    initialise(): void {
        this.store.dispatch(
            new TodoActions.LoadAction());
    }

    isLoaded(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodo_GetLoaded);
    }

    isLoading(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodo_GetLoading);
    }

    reorderItems(indexes: IReorderArrayIndexes) {
        this.store.dispatch(
            new TodoActions.ReorderListAction(indexes));
    }

    remove(todo: Todo) {
        if (todo.$key === undefined) {
            return;
        }
        this.store.dispatch(
            new TodoActions.RemoveAction(todo.$key));
    }

    save(todo: Todo) {
        this.store.dispatch(
            new TodoActions.SaveAction(todo));
    }
}
