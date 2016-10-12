import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../reducers';
import * as LoginActions from '../actions/login.action';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
// tslint:disable-next-line:no-unused-variable
import * as LoginReducer from '../reducers/login.reducer';

@Injectable()
export class LoginService {
    constructor(
        private af: AngularFire,
        private store: Store<FromRootReducer.State>,
    ) { }

    initialise(): void {
        this.store.dispatch(
            new LoginActions.BeginAuthenticationAction());

        // Subscribe to the auth object to check for the login status
        // of the user.      
        this.af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
            // Run once.
            // af.auth.unsubscribe();

            console.log('af.auth.subscribe:authState>', authState);
            let authenticated: boolean = !!authState;

            console.log('authenticated:', authenticated);

            if (authenticated) {
                this.store.dispatch(
                    new LoginActions.RestoreAuthenticationAction(authState));
            } else {
                this.store.dispatch(
                    new LoginActions.BeginAuthenticationFailureAction());
            }
        });
    }

    getLoginState() {
        return this.store.let(FromRootReducer.getLoginState);
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
                password}));
    }

    emailAuthentication(
        userName: string,
        password: string
    ) {
        this.store.dispatch(
            new LoginActions.EmailAuthenticationAction({
                userName,
                password}));
    }

    googleAuthentication() {
        this.store.dispatch(
            new LoginActions.GoogleAuthenticationAction());
    }

    logout() {
        this.store.dispatch(
            new LoginActions.LogoutAction());
        this.af.auth.logout();
    }
}
