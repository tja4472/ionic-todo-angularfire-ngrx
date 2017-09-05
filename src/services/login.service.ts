import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers/index';
import * as LoginActions from '../actions/login.action';

import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

// tslint:disable-next-line:max-line-length
// https://github.com/davidanaya/bi-dashboard-v1/blob/db0e3b71ef70d48453f776eb687aa465507146b0/src/app/auth/shared/services/auth.service.ts
@Injectable()
export class LoginService {
    private readonly CLASS_NAME = 'LoginService';

    // tslint:disable-next-line:member-ordering
    auth$ = this.af.authState.do((firebaseUser) => {
        if (!firebaseUser) {
            console.log('%s:authState: No user is signed in.', this.CLASS_NAME);

            this.store.dispatch(
                new LoginActions.Logout());
            return;
        }
        /*
                const user: User = {
                    email: next.email,
                    uid: next.uid,
                    authenticated: true
                };
                this.store.dispatch(new UserAuthenticatedAction(user));
        */
        console.log(`%s:User is signed in>`, this.CLASS_NAME, firebaseUser.uid);

        this.store.dispatch(
            new LoginActions.RestoreAuthentication({
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                isAnonymous: firebaseUser.isAnonymous,
            }));
    });

    constructor(
        private af: AngularFireAuth,
        private store: Store<FromRootReducer.IState>,
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);
        /*
                store.dispatch(
                    new LoginActions.BeginAuthenticationAction());

                af.auth.onAuthStateChanged((user: firebase.User) => {
                    if (user) {
                        // User is signed in.
                        console.log(`%s:User is signed in>`, this.CLASS_NAME, user.uid);

                        this.store.dispatch(
                            new LoginActions.RestoreAuthenticationAction({
                                displayName: user.displayName,
                                email: user.email,
                                isAnonymous: user.isAnonymous,
                            }));

                    } else {
                        // No user is signed in.
                        console.log('%s: No user is signed in.', this.CLASS_NAME);
                        store.dispatch(
                            new LoginActions.LogoutAction());
                    }
                })
        */
    }
    /*
        initialise(): void {
            this.store.dispatch(
                new LoginActions.BeginAuthenticationAction());

            // Subscribe to the auth object to check for the login status
            // of the user.
            this.af.authState.take(1).subscribe((authState: firebase.User) => {
                // Run once.
                // af.auth.unsubscribe();
                console.log('af.auth.subscribe:authState>', authState);
                let authenticated: boolean = !!authState;

                console.log('authenticated:', authenticated);

                if (authenticated) {
                    this.store.dispatch(
                        new LoginActions.RestoreAuthenticationAction({
                            displayName: authState.displayName,
                            email: authState.email,
                            isAnonymous: authState.isAnonymous,
                        }));
                } else {
                    this.store.dispatch(
                        new LoginActions.BeginAuthenticationFailureAction());
                }
            });
        }
    */

    public clearError$(): void {
        this.store.dispatch(
            new LoginActions.ClearError());
    }

    public error$() {
        // this works
        return this.store.select(FromRootReducer.getLogin_GetError);

        // this works
        // return this.store.select((s) => s.login.error);
    }

    getLoginState() {
        return this.store.select(FromRootReducer.getLoginState);
    }

    anonymousAuthentication() {
        this.store.dispatch(
            new LoginActions.AnonymousAuthentication());
    }

    createUser(
        userName: string,
        password: string
    ) {
        this.store.dispatch(
            new LoginActions.CreateUser({
                password,
                userName,
            }));
    }

    emailAuthentication(
        userName: string,
        password: string
    ) {
        /*
                this.store.dispatch(
                    new LoginActions.EmailAuthenticationAction({
                        userName,
                        password
                    }));
        */
        this.store.dispatch(
            new LoginActions.BeginAuthentication());
        this.af.auth.signInWithEmailAndPassword(userName, password).catch((error: firebase.FirebaseError) => {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;

            this.store.dispatch(
                new LoginActions.EmailAuthenticationFailure(error));
            // ...
        });
    }

    googleAuthentication() {
        this.store.dispatch(
            new LoginActions.GoogleAuthentication());
    }

    logout() {
        // this.store.dispatch(
        //    new LoginActions.LogoutAction());
        this.af.auth.signOut();
    }
}
