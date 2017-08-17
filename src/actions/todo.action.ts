// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

export const CLEAR_COMPLETED = '[ToDoActions] Clear Completed';
export const LOAD = '[ToDoActions] Load';
export const LOAD_SUCCESS = '[ToDoActions] Load Success';
export const REORDER_LIST = '[ToDoActions] Reorder List';
export const REMOVE = '[ToDoActions] Remove';
export const SAVE = '[ToDoActions] Save';

export class ClearCompletedAction implements Action {
    readonly type = CLEAR_COMPLETED;

    constructor() { }
}

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: ToDo[]) { }
}

export class RemoveAction implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class ReorderListAction implements Action {
    readonly type = REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class SaveAction implements Action {
    readonly type = SAVE;

    constructor(public payload: ToDo) { }
}

export type Actions =
    ClearCompletedAction |
    LoadAction |
    LoadSuccessAction |
    RemoveAction |
    ReorderListAction |
    SaveAction;
