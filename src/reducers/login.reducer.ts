import * as loginAction from '../actions/login.action';

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
        case loginAction.GOOGLE_AUTHENTICATION: {
            return assign(state, {
                isAuthenticating: true
            });
        }

        case loginAction.RESTORE_AUTHENTICATION: {
            return assign(state, {
                displayName: makeDisplayName(action.payload),
                isAuthenticated: true,
                isAuthenticating: false
            });
        }

        case loginAction.LOGOUT: {
            return assign(state, {
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false
            });
        }

        case loginAction.ANONYMOUS_AUTHENTICATION:
        case loginAction.BEGIN_AUTHENTICATION:
        case loginAction.CREATE_USER:
        case loginAction.EMAIL_AUTHENTICATION: {
            return assign(state, {
                error: null,
                isAuthenticating: true
            });
        }

        case loginAction.ANONYMOUS_AUTHENTICATION_FAILURE:
        case loginAction.CREATE_USER_FAILURE:
        case loginAction.EMAIL_AUTHENTICATION_FAILURE: {
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
        displayName: string | null,
        email: string | null,
    }) {
    if (user.isAnonymous) return 'Anonymous';

    if (user.displayName) return user.displayName;

    if (user.email) return user.email;
    return '';
}

// =========
// Selectors
// =========
export const getDisplayName = (state: State) => state.displayName;
export const getError = (state: State) => state.error;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsAuthenticating = (state: State) => state.isAuthenticating;
