import { Action } from '@ngrx/store';
import { label } from '../utils/util';

import { TodoCompleted } from '../models/todo-completed';

export const TodoCompletedActionTypes = {
    LOAD: label('[TodoCompletedActions] Load'),
    LOAD_SUCCESS: label('[TodoCompletedActions] Load Success'),
    MOVE_TO_CURRENT: label('[TodoCompletedActions] Move To Current'),
    REMOVE: label('[TodoCompletedActions] Remove'),
    SAVE: label('[TodoCompletedActions] Save'),
}

export class LoadAction implements Action {
    type = TodoCompletedActionTypes.LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    type = TodoCompletedActionTypes.LOAD_SUCCESS;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrentAction implements Action {
    type = TodoCompletedActionTypes.MOVE_TO_CURRENT;

    constructor(public payload: TodoCompleted) { }
}

export class RemoveAction implements Action {
    type = TodoCompletedActionTypes.REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class SaveAction implements Action {
    type = TodoCompletedActionTypes.SAVE;

    constructor(public payload: TodoCompleted) { }
}

export type TodoCompletedActions =
    LoadAction |
    LoadSuccessAction |
    MoveToCurrentAction |
    RemoveAction |
    SaveAction;








