import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { IState } from '../reducers';
import { Store } from '@ngrx/store';

import * as LoginActions from '../actions/login.action';

import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<IState>,
    public af: AngularFireAuth,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) anonymousAuthentication$ = this.actions$
    .ofType(LoginActions.ANONYMOUS_AUTHENTICATION)
    .map(() =>
      this.af.auth.signInAnonymously()
        .then((user) => this.state$.dispatch(new LoginActions.RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new LoginActions.AnonymousAuthenticationFailure(error)))
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) createUser$ = this.actions$
    .ofType(LoginActions.CREATE_USER)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: LoginActions.CreateUser) => action.payload)
    .map((payload) => {
      this.af.auth.createUserWithEmailAndPassword(
        payload.userName,
        payload.password
      )
        .then((user) => this.state$.dispatch(new LoginActions.RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new LoginActions.CreateUserFailure(error)));
    });

/*
  @Effect({ dispatch: false }) emailAuthentication$ = this.actions$
    .ofType(LoginActions.EMAIL_AUTHENTICATION)
    // .do(x => console.log('login.effect:emailAuthentication>', x))
    .map((action: LoginActions.EmailAuthenticationAction) => action.payload)
    .map(payload => {
      this.af.auth.signInWithEmailAndPassword(
        payload.userName,
        payload.password
      )
        .then(user => this.state$.dispatch(new LoginActions.RestoreAuthenticationAction({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch(error => {
          console.log('error>', error);
           this.state$.dispatch(new LoginActions.EmailAuthenticationFailureAction(error))
        })

    });
*/

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) authorizeWithGoogle$ = this.actions$
    .ofType(LoginActions.GOOGLE_AUTHENTICATION)
    // .do(x => console.log('login.effect:authorizeWithGoogle>', x))
    // .map((action: LoginActions.GoogleAuthenticationAction) => action.payload)
    .map(() => {
      this.af.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
        .then((user) => this.state$.dispatch(new LoginActions.RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new LoginActions.GoogleAuthenticationFailure(error)));
    });
}
