import { Observable } from 'rxjs/Observable';

import * as loginAction from '../actions/login.action';
// import { FirebaseAuthState } from 'angularfire2';

import { assign } from '../utils/assign';

export interface State {
    displayName: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: any;
};

const initialState: State = {
    displayName: '',
    isAuthenticated: false,
    isAuthenticating: false,
    error: null
};

export function reducer(
    state = initialState,
    action: loginAction.Actions,
): State {
    switch (action.type) {
        case loginAction.ActionTypes.GOOGLE_AUTHENTICATION: {
            return assign(state, {
                isAuthenticating: true
            });
        }

        // case loginAction.ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS:
        // case loginAction.ActionTypes.CREATE_USER_SUCCESS:
        // case loginAction.ActionTypes.EMAIL_AUTHENTICATION_SUCCESS:
        // case loginAction.ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS:
        case loginAction.ActionTypes.RESTORE_AUTHENTICATION: {
            // let user: FirebaseAuthState = action.payload.authState;

            return assign(state, {
                displayName: makeDisplayName(action.payload),
                isAuthenticated: true,
                isAuthenticating: false
            });
        }

        case loginAction.ActionTypes.LOGOUT: {
            return assign(state, {
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false
            });
        }

        case loginAction.ActionTypes.ANONYMOUS_AUTHENTICATION:
        case loginAction.ActionTypes.BEGIN_AUTHENTICATION:
        case loginAction.ActionTypes.CREATE_USER:
        case loginAction.ActionTypes.EMAIL_AUTHENTICATION: {
            return assign(state, {
                error: null,
                isAuthenticating: true
            });
        }

        // case LoginActionTypes.BEGIN_AUTHENTICATION_FAILURE:
        case loginAction.ActionTypes.ANONYMOUS_AUTHENTICATION_FAILURE:
        case loginAction.ActionTypes.CREATE_USER_FAILURE:
        case loginAction.ActionTypes.EMAIL_AUTHENTICATION_FAILURE: {
            return assign(state, {
                error: action.payload,
                isAuthenticated: false,
                isAuthenticating: false
            });
        }

        default: {
            return state;
        }
    }
}

function makeDisplayName(user: {
        isAnonymous: boolean;
        displayName: string,
        email: string,
    }) {
    if (user.isAnonymous) return 'Anonymous';

    if (user.displayName) return user.displayName;

    if (user.email) return user.email;
    return '';
}

// =========
// Selectors
// =========
export function getDisplayName(state$: Observable<State>) {
    return state$.select(state => state.displayName);
}

export function getError(state$: Observable<State>) {
    return state$.select(state => state.error);
}

export function getIsAuthenticated(state$: Observable<State>) {
    return state$.select(state => state.isAuthenticated);
}

export function getIsAuthenticating(state$: Observable<State>) {
    return state$.select(state => state.isAuthenticating);
}
