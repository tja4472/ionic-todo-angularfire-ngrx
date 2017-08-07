import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers/index';
import * as LoginActions from '../actions/login.action';

import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

// tslint:disable-next-line:no-unused-variable
import * as LoginReducer from '../reducers/login.reducer';

@Injectable()
export class LoginService {
    constructor(
        private af: AngularFireAuth,
        private store: Store<FromRootReducer.State>,
    ) { }

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

    getLoginState() {
        return this.store.select(FromRootReducer.getLoginState);
    }

    anonymousAuthentication() {
        this.store.dispatch(
            new LoginActions.AnonymousAuthenticationAction());
    }

    createUser(
        userName: string,
        password: string
    ) {
        this.store.dispatch(
            new LoginActions.CreateUserAction({
                userName,
                password
            }));
    }

    emailAuthentication(
        userName: string,
        password: string
    ) {
        this.store.dispatch(
            new LoginActions.EmailAuthenticationAction({
                userName,
                password
            }));
    }

    googleAuthentication() {
        this.store.dispatch(
            new LoginActions.GoogleAuthenticationAction());
    }

    logout() {
        this.store.dispatch(
            new LoginActions.LogoutAction());
        this.af.auth.signOut();
    }
}
