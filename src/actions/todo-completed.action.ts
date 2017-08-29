// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../shared/models/todo-completed.model';


export const LOAD = '[TodoCompletedActions] Load';
export const LOAD_SUCCESS = '[TodoCompletedActions] Load Success';
export const MOVE_TO_CURRENT = '[TodoCompletedActions] Move To Current';
export const REMOVE = '[TodoCompletedActions] Remove';
export const SAVE = '[TodoCompletedActions] Save';

export class Load implements Action {
    readonly type = LOAD;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrent implements Action {
    readonly type = MOVE_TO_CURRENT;

    constructor(public payload: TodoCompleted) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: TodoCompleted) { }
}

export type Actions =
    Load |
    LoadSuccess |
    MoveToCurrent |
    Remove |
    Save;
