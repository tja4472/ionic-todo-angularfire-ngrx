import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

import { reorderArray } from 'ionic-angular';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Injectable()
export class TodoDataService {
    private fbCurrentTodos: any; // readonly

    constructor(
        public af: AngularFireDatabase
    ) {
        console.log('TodoDataService:constructor');
        this.fbCurrentTodos = af.list(FIREBASE_CURRENT_TODOS);
    }

    getData(): Observable<Todo[]> {
        return this.af.list(FIREBASE_CURRENT_TODOS, {
            query: {
                orderByChild: 'index'
            }
        })
            .map((x) => x.map((d: any) => fromFirebaseTodo(d)));
    }

    reorderItemsAndUpdate(indexes: IReorderArrayIndexes, todos: Todo[]) {
        const itemsToSave = [...todos];
        reorderArray(itemsToSave, indexes);

        for (let x = 0; x < itemsToSave.length; x++) {
            this.fbCurrentTodos.update(itemsToSave[x].$key, { index: x });
        }
    }

    removeItem(itemKey: string) {
        this.fbCurrentTodos.remove(itemKey);
    }

    save(todo: Todo) {
        console.log('save>', todo);
        console.log('save:todo.isNew()>', todo.isNew());

        if (todo.$key === undefined) {
            // insert.
            this.fbCurrentTodos.push(toFirebaseTodo(todo));
        } else {
            // update.
            this.fbCurrentTodos.update(todo.$key, toFirebaseTodo(todo));
        }
    }
}

interface IFirebaseTodo {
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
}

function toFirebaseTodo(todo: Todo): IFirebaseTodo {
    // Important!
    // angularfire2-offline: Properties have to be alphabetical.
    // https://github.com/adriancarriger/angularfire2-offline/issues/57
    const result: IFirebaseTodo = {
        description: todo.description,
        index: todo.index,
        isComplete: todo.isComplete,
        name: todo.name,
    };

    console.log('toFirebaseTodo>', result);
    return result;
}

function fromFirebaseTodo(x: any): Todo {
    //
    console.log('TodoDataService:fromFirebaseTodo>', x);

    // const result: Todo = new Todo();
    const result = Object.assign(new Todo(),
        {
            $key: x.$key,
            description: x.description,
            index: x.index,
            isComplete: x.isComplete,
            name: x.name,
        });
    console.log('TodoDataService:fromFirebaseTodo:result>', result);
    /*
        const result: ITodo = {
            $key: x.$key,
            description: x.description,
            index: x.index,
            isComplete: x.isComplete,
            name: x.name,
            userId: '',
        };
    */
    /*
        if (result.description === undefined) {
            result.description = null;
        }
    */
    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}
