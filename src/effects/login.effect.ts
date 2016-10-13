// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mapTo';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/switchMapTo';
// import 'rxjs/add/operator/toArray';
// import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';
// import { Database } from '@ngrx/db';

import { State } from '../reducers';
import { Store } from '@ngrx/store';

import * as LoginActions from '../actions/login.action';

// import { TextItem } from '../models';
import {
  AngularFire, AuthMethods,
  AuthProviders
} from 'angularfire2';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public af: AngularFire,
  ) { }

  @Effect({ dispatch: false }) anonymousAuthentication$ = this.actions$
    .ofType(LoginActions.ActionTypes.ANONYMOUS_AUTHENTICATION)
    .map(() =>
      this.af.auth.login(
        {
          method: AuthMethods.Anonymous
        })
        .then(user => this.state$.dispatch(new LoginActions.AnonymousAuthenticationSuccessAction(user)))
        .catch(error => this.state$.dispatch(new LoginActions.AnonymousAuthenticationFailureAction(error)))
    );

  @Effect({ dispatch: false }) createUser$ = this.actions$
    .ofType(LoginActions.ActionTypes.CREATE_USER)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: LoginActions.CreateUserAction) => action.payload)
    .map(payload => {
      this.af.auth.createUser(
        { email: payload.userName, password: payload.password })
        .then(user => this.state$.dispatch(new LoginActions.CreateUserSuccessAction(user)))
        .catch(error => this.state$.dispatch(new LoginActions.CreateUserFailureAction(error)))
    });

  @Effect({ dispatch: false }) emailAuthentication$ = this.actions$
    .ofType(LoginActions.ActionTypes.EMAIL_AUTHENTICATION)
    // .do(x => console.log('login.effect:emailAuthentication>', x))
    .map((action: LoginActions.EmailAuthenticationAction) => action.payload)
    .map(payload => {
      this.af.auth.login(
        { email: payload.userName, password: payload.password },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password
        })
        .then(user => this.state$.dispatch(new LoginActions.EmailAuthenticationSuccessAction(user)))
        .catch(error => this.state$.dispatch(new LoginActions.EmailAuthenticationFailureAction(error)))
    });    

  @Effect({ dispatch: false }) authorizeWithGoogle$ = this.actions$
    .ofType(LoginActions.ActionTypes.GOOGLE_AUTHENTICATION)
    // .do(x => console.log('login.effect:authorizeWithGoogle>', x))
    // .map((action: LoginActions.GoogleAuthenticationAction) => action.payload)
    .map(()=> {
      this.af.auth.login(
        {
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
        })
        .then(user => this.state$.dispatch(new LoginActions.GoogleAuthenticationSuccessAction(user)))
        .catch(error => this.state$.dispatch(new LoginActions.GoogleAuthenticationFailureAction(error)))
    });     
}
