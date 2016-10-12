import { Action } from '@ngrx/store';
import { type } from '../utils/util';

import { TodoCompleted } from '../models/todo-completed';

export const ActionTypes = {
    LOAD: type('[TodoCompletedActions] Load'),
    LOAD_SUCCESS: type('[TodoCompletedActions] Load Success'),
    MOVE_TO_CURRENT: type('[TodoCompletedActions] Move To Current'),
    REMOVE: type('[TodoCompletedActions] Remove'),
    SAVE: type('[TodoCompletedActions] Save'),
}

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor() { }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrentAction implements Action {
    type = ActionTypes.MOVE_TO_CURRENT;

    constructor(public payload: TodoCompleted) { }
}

export class RemoveAction implements Action {
    type = ActionTypes.REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class SaveAction implements Action {
    type = ActionTypes.SAVE;

    constructor(public payload: TodoCompleted) { }
}

export type Actions =
    LoadAction |
    LoadSuccessAction |
    MoveToCurrentAction |
    RemoveAction |
    SaveAction;
