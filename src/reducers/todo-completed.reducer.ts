import { Observable } from 'rxjs/Observable';

import { TodoCompletedActions, TodoCompletedActionTypes } from '../actions/todo-completed.action';
import { TodoCompleted } from '../models/todo-completed';
import { assign } from '../utils';

export interface State {
    loaded: boolean;
    loading: boolean;
    todoCompletedList: TodoCompleted[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    todoCompletedList: []
};

export function reducer(
    state = initialState,
    action: TodoCompletedActions,
): State {
    switch (action.type) {
        case TodoCompletedActionTypes.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case TodoCompletedActionTypes.LOAD_SUCCESS: {
            const items: TodoCompleted[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todoCompletedList: items.map(book => book)
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

export function geTodoCompletedList(state$: Observable<State>) {
    return state$.select(s => s.todoCompletedList);
}
