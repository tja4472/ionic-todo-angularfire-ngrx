import * as todoAction from '../actions/todo.action';
import { ITodo } from '../models/todo.model';

export interface IState {
    loaded: boolean;
    loading: boolean;
    todos: ITodo[];
}

const initialState: IState = {
    loaded: false,
    loading: false,
    todos: []
};

export function reducer(
    state = initialState,
    action: todoAction.Actions): IState {
    switch (action.type) {
        case todoAction.LOAD: {
            return Object.assign(state, {
                loading: true
            });
        }

        case todoAction.LOAD_SUCCESS: {
            const items: ITodo[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todos: items.map((book) => book)
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
export const getLoaded = (state: IState) => state.loaded;
export const getLoading = (state: IState) => state.loading;
export const getTodos = (state: IState) => state.todos;
