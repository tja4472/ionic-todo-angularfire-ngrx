import { Action } from '@ngrx/store';


export const ANONYMOUS_AUTHENTICATION = '[Login] Anonymous Authentication';
export const ANONYMOUS_AUTHENTICATION_FAILURE = '[Login] Anonymous Authentication Failure';
export const BEGIN_AUTHENTICATION = '[Login] Begin Authentication';
export const BEGIN_AUTHENTICATION_FAILURE = '[Login] Begin Authentication Failure';
export const CREATE_USER = '[Login] Create User';
export const CREATE_USER_FAILURE = '[Login] Create User Failure';
export const EMAIL_AUTHENTICATION = '[Login] Email Authentication';
export const EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure';
export const GOOGLE_AUTHENTICATION = '[Login] Google Authentication';
export const GOOGLE_AUTHENTICATION_FAILURE = '[Login] Google Authentication Failure';
export const LOGOUT = '[Login] Logout';
export const RESTORE_AUTHENTICATION = '[Login] Restore Authentication';

export class AnonymousAuthenticationAction implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailureAction implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

export class BeginAuthenticationAction implements Action {
    readonly type = BEGIN_AUTHENTICATION;

    constructor() { }
}

export class BeginAuthenticationFailureAction implements Action {
    readonly type = BEGIN_AUTHENTICATION_FAILURE;

    constructor() { }
}

export class CreateUserAction implements Action {
    readonly type = CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailureAction implements Action {
    readonly type = CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error 
}

export class EmailAuthenticationAction implements Action {
    readonly type = EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailureAction implements Action {
    readonly type = EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

export class GoogleAuthenticationAction implements Action {
    readonly type = GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailureAction implements Action {
    readonly type = GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;

    constructor() { }
}

export class RestoreAuthenticationAction implements Action {
    readonly type = RESTORE_AUTHENTICATION;

    constructor(public payload: {
        isAnonymous: boolean;
        displayName: string | null,
        email: string | null,
    }) { }
}

export type Actions =
    AnonymousAuthenticationAction |
    AnonymousAuthenticationFailureAction |
    BeginAuthenticationAction |
    BeginAuthenticationFailureAction |
    CreateUserAction |
    CreateUserFailureAction |
    EmailAuthenticationAction |
    EmailAuthenticationFailureAction |
    GoogleAuthenticationAction |
    GoogleAuthenticationFailureAction |
    LogoutAction |
    RestoreAuthenticationAction;
