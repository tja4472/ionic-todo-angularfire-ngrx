// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

export const ANONYMOUS_AUTHENTICATION = '[Login] Anonymous Authentication';
export const ANONYMOUS_AUTHENTICATION_FAILURE = '[Login] Anonymous Authentication Failure';
export const BEGIN_AUTHENTICATION = '[Login] Begin Authentication';
export const BEGIN_AUTHENTICATION_FAILURE = '[Login] Begin Authentication Failure';
export const CLEAR_ERROR = '[Login] Clear Error';
export const CREATE_USER = '[Login] Create User';
export const CREATE_USER_FAILURE = '[Login] Create User Failure';
export const EMAIL_AUTHENTICATION = '[Login] Email Authentication';
export const EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure';
export const GOOGLE_AUTHENTICATION = '[Login] Google Authentication';
export const GOOGLE_AUTHENTICATION_FAILURE = '[Login] Google Authentication Failure';
export const LOGOUT = '[Login] Logout';
export const RESTORE_AUTHENTICATION = '[Login] Restore Authentication';

export class AnonymousAuthentication implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailure implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

export class BeginAuthentication implements Action {
    readonly type = BEGIN_AUTHENTICATION;

    constructor() { }
}

export class BeginAuthenticationFailure implements Action {
    readonly type = BEGIN_AUTHENTICATION_FAILURE;

    constructor() { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;

    constructor() { }
}

export class CreateUser implements Action {
    readonly type = CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailure implements Action {
    readonly type = CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error
}

export class EmailAuthentication implements Action {
    readonly type = EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailure implements Action {
    readonly type = EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

export class GoogleAuthentication implements Action {
    readonly type = GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailure implements Action {
    readonly type = GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor() { }
}

export class RestoreAuthentication implements Action {
    readonly type = RESTORE_AUTHENTICATION;

    constructor(public payload: {
        isAnonymous: boolean;
        displayName: string | null,
        email: string | null,
    }) { }
}

export type Actions =
    AnonymousAuthentication |
    AnonymousAuthenticationFailure |
    BeginAuthentication |
    BeginAuthenticationFailure |
    ClearError |
    CreateUser |
    CreateUserFailure |
    EmailAuthentication |
    EmailAuthenticationFailure |
    GoogleAuthentication |
    GoogleAuthenticationFailure |
    Logout |
    RestoreAuthentication;
