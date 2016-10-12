import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

import { reorderArray } from 'ionic-angular';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Injectable()
export class TodoDataService {
    private fb_CurrentTodos: any; // readonly

    constructor(
        public af: AngularFire
    ) {
        this.fb_CurrentTodos = af.database.list(FIREBASE_CURRENT_TODOS);
    }

    getData(): Observable<ToDo[]> {
        return this.af.database.list(FIREBASE_CURRENT_TODOS, {
            query: {
                orderByChild: 'index'
            }
        })
            .map(x => x.map(d => fromFirebaseTodo(d)));
    }

    reorderItemsAndUpdate(indexes: Indexes, todos: ToDo[]) {
        const itemsToSave = [...todos];
        reorderArray(itemsToSave, indexes);

        for (let x = 0; x < itemsToSave.length; x++) {
            this.fb_CurrentTodos.update(itemsToSave[x].$key, { index: x });
        }
    }

    removeItem(itemKey: string) {
        this.fb_CurrentTodos.remove(itemKey);
    }

    save(todo: ToDo) {
        console.log('save>', todo);

        if (todo.$key === '') {
            // insert.
            this.fb_CurrentTodos.push(toFirebaseTodo(todo));
        } else {
            // update.
            this.fb_CurrentTodos.update(todo.$key, toFirebaseTodo(todo));
        }
    }
}

interface FirebaseTodo {
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
}

function toFirebaseTodo(todo: ToDo): FirebaseTodo {
    //
    let result: FirebaseTodo = {
        description: todo.description,
        index: todo.index,
        name: todo.name,
        isComplete: todo.isComplete
    };

    console.log('toFirebaseTodo>', result);
    return result;
}

function fromFirebaseTodo(x: any): ToDo {
    let result: ToDo = {
        $key: x.$key,
        description: x.description,
        index: x.index,
        isComplete: x.isComplete,
        name: x.name
    };

    if (result.description === undefined) {
        result.description = null;
    }

    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}
