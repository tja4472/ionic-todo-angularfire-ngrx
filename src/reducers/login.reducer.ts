import * as loginAction from '../actions/login.action';

export interface IState {
    displayName: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: any;
}

const initialState: IState = {
    displayName: '',
    error: null,
    isAuthenticated: false,
    isAuthenticating: false,
};

export function reducer(
    state = initialState,
    action: loginAction.Actions,
): IState {
    switch (action.type) {
        case loginAction.CLEAR_ERROR: {
            return {
                ...state,
                error: null,
            };
        }

        case loginAction.GOOGLE_AUTHENTICATION: {
            return {
                ...state,
                isAuthenticating: true,
            };
        }

        case loginAction.RESTORE_AUTHENTICATION: {
            return {
                ...state,
                displayName: makeDisplayName(action.payload),
                isAuthenticated: true,
                isAuthenticating: false,
            };
        }

        case loginAction.LOGOUT: {
            return {
                ...state,
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false,
            };
        }

        case loginAction.ANONYMOUS_AUTHENTICATION:
        case loginAction.BEGIN_AUTHENTICATION:
        case loginAction.CREATE_USER:
        case loginAction.EMAIL_AUTHENTICATION: {
            return {
                ...state,
                error: null,
                isAuthenticating: true,
            };
        }

        case loginAction.ANONYMOUS_AUTHENTICATION_FAILURE:
        case loginAction.CREATE_USER_FAILURE:
        case loginAction.EMAIL_AUTHENTICATION_FAILURE: {
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
                isAuthenticating: false,
            };
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
    if (user.isAnonymous) { return 'Anonymous'; }

    if (user.displayName) { return user.displayName; }

    if (user.email) { return user.email; }
    return '';
}

// =========
// Selectors
// =========
export const getDisplayName = (state: IState) => state.displayName;
export const getError = (state: IState) => state.error;
export const getIsAuthenticated = (state: IState) => state.isAuthenticated;
export const getIsAuthenticating = (state: IState) => state.isAuthenticating;

/*
let lastState: IState;
export const getError = (state: IState) => {
    console.log('getError>', state);
    console.log('counterB:Projector called, parameter changed: ', !(lastState === state));
    lastState = state;
    return state.error;
};
*/
