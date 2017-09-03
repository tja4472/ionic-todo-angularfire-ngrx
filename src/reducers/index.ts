import {
    ActionReducerMap,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// import { storeLogger } from 'ngrx-store-logger';
// import { storeFreeze } from 'ngrx-store-freeze';
// import { localStorageSync } from 'ngrx-store-localstorage';
// import { combineReducers } from '@ngrx/store';

import * as fromLoginReducer from './login.reducer';
import * as fromTodoCompletedReducer from './todo-completed.reducer';
import * as fromTodoReducer from './todo.reducer';

export interface IState {
    // These property names have to match those in the compose.
    login: fromLoginReducer.IState;
    todo: fromTodoReducer.IState;
    todoCompleted: fromTodoCompletedReducer.IState;
}

export const reducers: ActionReducerMap<IState> = {
    login: fromLoginReducer.reducer,
    todo: fromTodoReducer.reducer,
    todoCompleted: fromTodoCompletedReducer.reducer,
};

export const metaReducers: Array<MetaReducer<any>> = [storeFreeze];

/*
const developmentReducer: ActionReducer<State> = compose(
    localStorageSync(['todo'], true),
    storeFreeze,
    storeLogger(),
    combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}
*/

/***********
 * Selectors
 ***********/
// login
export const getLoginState = (state: IState) => state.login;

// tslint:disable-next-line:variable-name
export const getLogin_GetDisplayName = createSelector(getLoginState, fromLoginReducer.getDisplayName);
// tslint:disable-next-line:variable-name
export const getLogin_GetError = createSelector(getLoginState, fromLoginReducer.getError);
// tslint:disable-next-line:variable-name
export const getLogin_GetIsAuthenticated = createSelector(getLoginState, fromLoginReducer.getIsAuthenticated);
// tslint:disable-next-line:variable-name
export const getLogin_GetIsAuthenticating = createSelector(getLoginState, fromLoginReducer.getIsAuthenticating);
//
// todo
export const getTodoState = (state: IState) => state.todo;

// tslint:disable-next-line:variable-name
export const getTodo_GetLoaded = createSelector(getTodoState, fromTodoReducer.getLoaded);
// tslint:disable-next-line:variable-name
export const getTodo_GetLoading = createSelector(getTodoState, fromTodoReducer.getLoading);
// tslint:disable-next-line:variable-name
export const getTodo_GetTodos = createSelector(getTodoState, fromTodoReducer.getTodos);
//
// todoCompleted
export const getTodoCompletedState = (state: IState) => state.todoCompleted;

// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetLoaded = createSelector(getTodoCompletedState, fromTodoCompletedReducer.getLoaded);
// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetLoading = createSelector(getTodoCompletedState, fromTodoCompletedReducer.getLoaded);
// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetTodoCompletedList
    = createSelector(
        getTodoCompletedState,
        fromTodoCompletedReducer.getTodoCompletedList);
