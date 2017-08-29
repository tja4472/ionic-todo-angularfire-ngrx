// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

export const CLEAR_COMPLETED = '[ToDoActions] Clear Completed';
export const LOAD = '[ToDoActions] Load';
export const LOAD_SUCCESS = '[ToDoActions] Load Success';
export const REORDER_LIST = '[ToDoActions] Reorder List';
export const REMOVE = '[ToDoActions] Remove';
export const SAVE = '[ToDoActions] Save';

export class ClearCompleted implements Action {
    readonly type = CLEAR_COMPLETED;

    constructor() { }
}

export class Load implements Action {
    readonly type = LOAD;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Todo[]) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class ReorderList implements Action {
    readonly type = REORDER_LIST;

    constructor(public payload: IReorderArrayIndexes) { }
}

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: Todo) { }
}

export type Actions =
    ClearCompleted |
    Load |
    LoadSuccess |
    Remove |
    ReorderList |
    Save;
