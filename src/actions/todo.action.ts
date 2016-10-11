import { Action } from '@ngrx/store';
import { label } from '../utils/util';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

export const TodoActionTypes = {
    CLEAR_COMPLETED: label('[ToDoActions] Clear Completed'),
    LOAD: label('[ToDoActions] Load'),
    LOAD_SUCCESS: label('[ToDoActions] Load Success'),
    REORDER_LIST: label('[ToDoActions] Reorder List'),
    REMOVE: label('[ToDoActions] Remove'),
    SAVE: label('[ToDoActions] Save'),
}

export class ClearCompletedAction implements Action {
    type = TodoActionTypes.CLEAR_COMPLETED;

    constructor() { }
}

export class LoadAction implements Action {
    type = TodoActionTypes.LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    type = TodoActionTypes.LOAD_SUCCESS;

    constructor(public payload: ToDo[]) { }
}

export class RemoveAction implements Action {
    type = TodoActionTypes.REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class ReorderListAction implements Action {
    type = TodoActionTypes.REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class SaveAction implements Action {
    type = TodoActionTypes.SAVE;

    constructor(public payload: ToDo) { }
}

export type TodoActions =
    ClearCompletedAction |
    LoadAction |
    LoadSuccessAction |
    RemoveAction |
    ReorderListAction |
    SaveAction;
