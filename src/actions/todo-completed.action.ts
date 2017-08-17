// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../models/todo-completed';


export const LOAD = '[TodoCompletedActions] Load';
export const LOAD_SUCCESS = '[TodoCompletedActions] Load Success';
export const MOVE_TO_CURRENT = '[TodoCompletedActions] Move To Current';
export const REMOVE = '[TodoCompletedActions] Remove';
export const SAVE = '[TodoCompletedActions] Save';

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrentAction implements Action {
    readonly type = MOVE_TO_CURRENT;

    constructor(public payload: TodoCompleted) { }
}

export class RemoveAction implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class SaveAction implements Action {
    readonly type = SAVE;

    constructor(public payload: TodoCompleted) { }
}

export type Actions =
    LoadAction |
    LoadSuccessAction |
    MoveToCurrentAction |
    RemoveAction |
    SaveAction;
