// import '@ngrx/core/add/operator/select';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { combineReducers } from '@ngrx/store';
//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
// import { share, Selector } from '../utils/util';

import * as fromLoginReducer from './login.reducer';
import * as fromTodoCompletedReducer from './todo-completed.reducer';
import * as fromTodoReducer from './todo.reducer';

//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
import { ToDo } from '../models/todo';
//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
import { TodoCompleted } from '../models/todo-completed';

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

const developmentReducer = compose(
    localStorageSync(['todo'], true),
    storeFreeze,
    storeLogger(),
    combineReducers)(reducers);
// const productionReducer = combineReducers(reducers);

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
export function getLoginState(state$: Observable<State>) {
    return state$.select(state => state.login);
}

export const getLogin_GetDisplayName = compose(fromLoginReducer.getDisplayName, getLoginState);
export const getLogin_GetError = compose(fromLoginReducer.getError, getLoginState);
export const getLogin_GetIsAuthenticated = compose(fromLoginReducer.getIsAuthenticated, getLoginState);
export const getLogin_GetIsAuthenticating = compose(fromLoginReducer.getIsAuthenticating, getLoginState);

// todo
export function getTodoState(state$: Observable<State>) {
    return state$.select(state => state.todo);
}

export const getTodo_GetLoaded = compose(fromTodoReducer.getLoaded, getTodoState);
export const getTodo_GetLoading = compose(fromTodoReducer.getLoading, getTodoState);
export const getTodo_GetTodos = compose(fromTodoReducer.getTodos, getTodoState);

// todoCompleted
export function getTodoCompletedState(state$: Observable<State>) {
    return state$.select(state => state.todoCompleted);
}

export const getTodoCompleted_GetLoaded = compose(fromTodoCompletedReducer.getLoaded, getTodoCompletedState);
export const getTodoCompleted_GetLoading = compose(fromTodoCompletedReducer.getLoading, getTodoCompletedState);
export const getTodoCompleted_GetTodoCompletedList = compose(fromTodoCompletedReducer.geTodoCompletedList, getTodoCompletedState);
