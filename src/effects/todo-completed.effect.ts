import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers';

import * as TodoCompletedAction from '../actions/todo-completed.action';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../shared/models/todo-completed.model';

@Injectable()
export class TodoCompletedEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,
    private dataService: TodoCompletedDataService,
    private fb1DataService: Fb1DataService,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect() loadCollection$ = this.actions$
    .ofType(TodoCompletedAction.LOAD)
    .do((x) => { console.log('Effect:loadCollection$:A', x); })
    .withLatestFrom(this.state$)
    .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(() => this.dataService.getData())
    .do((x) => { console.log('Effect:loadCollection$:B', x); })
    .map((items: TodoCompleted[]) => new TodoCompletedAction.LoadSuccess(items));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) moveToCurrent$ = this.actions$
    .ofType(TodoCompletedAction.MOVE_TO_CURRENT)
    .map((action: TodoCompletedAction.MoveToCurrent) => action.payload)
    .do((payload) => {
      console.log('Effect:moveToCurrent$:A', payload);
      this.fb1DataService.moveToCurrent(payload);
    });
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
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeItem$ = this.actions$
    .ofType(TodoCompletedAction.REMOVE)
    .map((action: TodoCompletedAction.Remove) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(payload);
    });
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

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) save$ = this.actions$
    .ofType(TodoCompletedAction.SAVE)
    .map((action: TodoCompletedAction.Save) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload);
    });
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
