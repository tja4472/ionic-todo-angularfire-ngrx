import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/Rx';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers/index';
import * as LoginActions from '../actions/login.action';

import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

import { SignedInUser } from '../models/signed-in-user.model';

// tslint:disable-next-line:max-line-length
// https://github.com/davidanaya/bi-dashboard-v1/blob/db0e3b71ef70d48453f776eb687aa465507146b0/src/app/auth/shared/services/auth.service.ts
@Injectable()
export class LoginService {
    public notifier$: ReplaySubject<SignedInUser | null> = new ReplaySubject<SignedInUser>(1);

    private readonly CLASS_NAME = 'LoginService';

    // tslint:disable-next-line:member-ordering
    /*
    auth$ = this.af.authState.do((firebaseUser) => {
        console.log('@@@@@@@@@@@@@@@@@@');
        if (!firebaseUser) {
            console.log('%s:authState: No user is signed in.', this.CLASS_NAME);
            this.notifier$.next(null);
            this.store.dispatch(
                new LoginActions.Logout());
            return;
        }

        console.log(`%s:User is signed in>`, this.CLASS_NAME, firebaseUser.uid);
        this.notifier$.next(this.createSignedInUser(firebaseUser));

        this.store.dispatch(
            new LoginActions.RestoreAuthentication({
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                isAnonymous: firebaseUser.isAnonymous,
            }));
    });
    */

    constructor(
        private af: AngularFireAuth,
        private store: Store<FromRootReducer.IState>,
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);

        af.authState.subscribe((firebaseUser) => {
            if (!firebaseUser) {
                console.log('%s:authState: No user is signed in.', this.CLASS_NAME);
                this.notifier$.next(null);
                this.store.dispatch(
                    new LoginActions.Logout());
                return;
            }

            console.log(`%s:User is signed in>`, this.CLASS_NAME, firebaseUser.uid);
            this.notifier$.next(this.createSignedInUser(firebaseUser));

            this.store.dispatch(
                new LoginActions.RestoreAuthentication({
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    isAnonymous: firebaseUser.isAnonymous,
                }));
        });
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
        console.log('emailAuthentication');
        this.store.dispatch(
            new LoginActions.BeginAuthentication());
        this.af.auth.signInWithEmailAndPassword(userName, password).catch((error: firebase.FirebaseError) => {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            console.log('emailAuthentication>', error);
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

    private createSignedInUser(
        user: firebase.User
    ): SignedInUser {
        const result: SignedInUser = new SignedInUser(
            {
                email: user.email,
                firebaseDisplayName: user.displayName,
                userId: user.uid,
            }
        );

        return result;
    }
}
