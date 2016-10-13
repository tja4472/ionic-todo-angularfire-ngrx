import { Observable } from 'rxjs/Observable';

import * as todoCompletedAction from '../actions/todo-completed.action';
import { TodoCompleted } from '../models/todo-completed';
import { assign } from '../utils/assign';

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
    action: todoCompletedAction.Actions,
): State {
    switch (action.type) {
        case todoCompletedAction.ActionTypes.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case todoCompletedAction.ActionTypes.LOAD_SUCCESS: {
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
    return state$.select(state => state.loaded);
}

export function getLoading(state$: Observable<State>) {
    return state$.select(state => state.loading);
}

export function geTodoCompletedList(state$: Observable<State>) {
    return state$.select(state => state.todoCompletedList);
}
