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
        case todoAction.LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case todoAction.LOAD_SUCCESS: {
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
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTodos = (state: State) => state.todos;
