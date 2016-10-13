import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// error TS4029: https://github.com/Microsoft/TypeScript/issues/5938
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:no-unused-variable 
import { Action, Store } from '@ngrx/store'

import * as FromRootReducer from '../reducers';

import * as TodoCompletedAction from '../actions/todo-completed.action';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class TodoCompletedEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.State>,
    private dataService: TodoCompletedDataService,
    private fb1DataService: Fb1DataService,
  ) { }

  @Effect() loadCollection$ = this.actions$
    .ofType(TodoCompletedAction.ActionTypes.LOAD)
    .do(x => { console.log('Effect:loadCollection$:A', x); })
    .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable    
    .filter(([action, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(x => this.dataService.getData())
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: TodoCompleted[]) => new TodoCompletedAction.LoadSuccessAction(items));

  @Effect({ dispatch: false }) moveToCurrent$ = this.actions$
    .ofType(TodoCompletedAction.ActionTypes.MOVE_TO_CURRENT)
    .map((action: TodoCompletedAction.MoveToCurrentAction) => action.payload)
    .do(payload => {
      console.log('Effect:moveToCurrent$:A', payload);
      this.fb1DataService.moveToCuurent(payload);
    })
  /*
    @Effect() moveToCurrent$ = this.updates$
      .whenAction(TodoCompletedActions.MOVE_TO_CURRENT)
      .do(x => {
        console.log('Effect:moveToCurrent$:A', x);
        this.fb1DataService.moveToCuurent(
          x.action.payload);
      })
  
      // Terminate effect.
      .ignoreElements();
  */
  @Effect({ dispatch: false }) removeItem$ = this.actions$
    .ofType(TodoCompletedAction.ActionTypes.REMOVE)
    .map((action: TodoCompletedAction.RemoveAction) => action.payload)
    .do(payload => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(payload);
    })
  /*
    @Effect() removeItem$ = this.updates$
      .whenAction(TodoCompletedActions.REMOVE)
      .do(x => {
        console.log('Effect:removeItem$:A', x);
        this.dataService.removeItem(
          x.action.payload);
      })
  
      // Terminate effect.
      .ignoreElements();
  */

  @Effect({ dispatch: false }) save$ = this.actions$
    .ofType(TodoCompletedAction.ActionTypes.SAVE)
    .map((action: TodoCompletedAction.SaveAction) => action.payload)
    .do(payload => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload);
    })
  /*
    @Effect() save$ = this.updates$
      .whenAction(TodoCompletedActions.SAVE)
      .do(x => {
        console.log('Effect:save$:A', x);
        this.dataService.save(
          x.action.payload);
      })
  
      // Terminate effect.
      .ignoreElements();
  */
}
