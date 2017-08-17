import * as todoCompletedAction from '../actions/todo-completed.action';
import { ITodoCompleted } from '../models/todo-completed';

export interface IState {
    loaded: boolean;
    loading: boolean;
    todoCompletedList: ITodoCompleted[];
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
            const items: ITodoCompleted[] = action.payload;

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
