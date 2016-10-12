import { Observable } from 'rxjs/Observable';

import { TodoActions, TodoActionTypes } from '../actions/todo.action';
import { ToDo } from '../models/todo';
import { assign } from '../utils';

export interface State {
    loaded: boolean;
    loading: boolean;
    todos: ToDo[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    todos: []
};

export function reducer(
    state = initialState,
    action: TodoActions): State {
    switch (action.type) {
        case TodoActionTypes.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case TodoActionTypes.LOAD_SUCCESS: {
            const items: ToDo[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todos: items.map(book => book)
            };
        }

        default: {
            return state;
        }
    }
}

// =========
// Selectors
// =========
export function getLoaded(state$: Observable<State>) {
    return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<State>) {
    return state$.select(s => s.loading);
}

export function getTodos(state$: Observable<State>) {
    return state$.select(s => s.todos);
}
