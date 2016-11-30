import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { combineReducers } from '@ngrx/store';

import * as fromLoginReducer from './login.reducer';
import * as fromTodoCompletedReducer from './todo-completed.reducer';
import * as fromTodoReducer from './todo.reducer';

export interface State {
    // These property names have to match those in the compose.
    login: fromLoginReducer.State;
    todo: fromTodoReducer.State;
    todoCompleted: fromTodoCompletedReducer.State;
}

const reducers = {
    login: fromLoginReducer.reducer,
    todo: fromTodoReducer.reducer,
    todoCompleted: fromTodoCompletedReducer.reducer,
};

const developmentReducer: ActionReducer<State> = compose(
    localStorageSync(['todo'], true),
    storeFreeze,
    storeLogger(),
    combineReducers)(reducers);
// const productionReducer: ActionReducer<State>  = combineReducers(reducers);

/*
Don't know where PROD is set.

export function reducer(state: any, action: any) {
  if (PROD) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
*/
export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

/***********
 * Selectors
 ***********/
// login
export const getLoginState = (state: State) => state.login;

export const getLogin_GetDisplayName = createSelector(getLoginState, fromLoginReducer.getDisplayName);
export const getLogin_GetError = createSelector(getLoginState, fromLoginReducer.getError);
export const getLogin_GetIsAuthenticated = createSelector(getLoginState, fromLoginReducer.getIsAuthenticated);
export const getLogin_GetIsAuthenticating = createSelector(getLoginState, fromLoginReducer.getIsAuthenticating);
//
// todo
export const getTodoState = (state: State) => state.todo;

export const getTodo_GetLoaded = createSelector(getTodoState, fromTodoReducer.getLoaded);
export const getTodo_GetLoading = createSelector(getTodoState, fromTodoReducer.getLoading);
export const getTodo_GetTodos = createSelector(getTodoState, fromTodoReducer.getTodos);
//
// todoCompleted
export const getTodoCompletedState = (state: State) => state.todoCompleted;

export const getTodoCompleted_GetLoaded = createSelector(getTodoCompletedState, fromTodoCompletedReducer.getLoaded);
export const getTodoCompleted_GetLoading = createSelector(getTodoCompletedState, fromTodoCompletedReducer.getLoaded);
export const getTodoCompleted_GetTodoCompletedList = createSelector(getTodoCompletedState, fromTodoCompletedReducer.getTodoCompletedList);
