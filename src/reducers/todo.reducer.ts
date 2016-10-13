import { Observable } from 'rxjs/Observable';

import * as todoAction from '../actions/todo.action';
import { ToDo } from '../models/todo';
import { assign } from '../utils/assign';

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
    action: todoAction.Actions): State {
    switch (action.type) {
        case todoAction.ActionTypes.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case todoAction.ActionTypes.LOAD_SUCCESS: {
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
    return state$.select(state => state.loaded);
}

export function getLoading(state$: Observable<State>) {
    return state$.select(state => state.loading);
}

export function getTodos(state$: Observable<State>) {
    return state$.select(state => state.todos);
}
