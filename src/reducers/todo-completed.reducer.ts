import * as todoCompletedAction from '../actions/todo-completed.action';
import { TodoCompleted } from '../shared/models/todo-completed.model';

export interface IState {
    loaded: boolean;
    loading: boolean;
    todoCompletedList: TodoCompleted[];
}

const initialState: IState = {
    loaded: false,
    loading: false,
    todoCompletedList: []
};

export function reducer(
    state = initialState,
    action: todoCompletedAction.Actions,
): IState {
    switch (action.type) {
        case todoCompletedAction.LOAD: {
            return Object.assign(state, {
                loading: true
            });
        }

        case todoCompletedAction.LOAD_SUCCESS: {
            const items: TodoCompleted[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todoCompletedList: items.map((book) => book)
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
export const getTodoCompletedList = (state: IState) => state.todoCompletedList;
