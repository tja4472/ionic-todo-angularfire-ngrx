import { Action } from '@ngrx/store';
import { type } from '../utils/util';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

export const ActionTypes = {
    CLEAR_COMPLETED: type('[ToDoActions] Clear Completed'),
    LOAD: type('[ToDoActions] Load'),
    LOAD_SUCCESS: type('[ToDoActions] Load Success'),
    REORDER_LIST: type('[ToDoActions] Reorder List'),
    REMOVE: type('[ToDoActions] Remove'),
    SAVE: type('[ToDoActions] Save'),
}

export class ClearCompletedAction implements Action {
    type = ActionTypes.CLEAR_COMPLETED;

    constructor() { }
}

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: ToDo[]) { }
}

export class RemoveAction implements Action {
    type = ActionTypes.REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class ReorderListAction implements Action {
    type = ActionTypes.REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class SaveAction implements Action {
    type = ActionTypes.SAVE;

    constructor(public payload: ToDo) { }
}

export type Actions =
    ClearCompletedAction |
    LoadAction |
    LoadSuccessAction |
    RemoveAction |
    ReorderListAction |
    SaveAction;
