import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

import { reorderArray } from 'ionic-angular';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

interface IFirebaseTodo {
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
}

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
        return this.af.list(
            FIREBASE_CURRENT_TODOS,
            (ref) => ref.orderByChild('index'))
            .snapshotChanges()
            .map((actions) => actions.map((action) => {
                if ((action === null)
                    || (action.payload === null)
                    || (action.payload.key === null)
                ) {
                    return new Todo();
                }

                const $key = action.payload.key;
                const data = { $key, ...action.payload.val() };

                return this.fromFirebaseTodo(data);
            }));
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

        if (todo.isNew()) {
            // insert.
            this.fbCurrentTodos.push(this.toFirebaseTodo(todo));
        } else {
            // update.
            this.fbCurrentTodos.update(todo.$key, this.toFirebaseTodo(todo));
        }
    }

    private toFirebaseTodo(todo: Todo): IFirebaseTodo {
        //
        const result: IFirebaseTodo = {
            description: todo.description,
            index: todo.index,
            isComplete: todo.isComplete,
            name: todo.name,
        };

        console.log('toFirebaseTodo>', result);
        return result;
    }

    private fromFirebaseTodo(x: any): Todo {
        //
        console.log('TodoDataService:fromFirebaseTodo>', x);

        const result: Todo = new Todo(
            {
                $key: x.$key,
                description: x.description,
                index: x.index,
                isComplete: x.isComplete,
                name: x.name,
            });

        console.log('TodoDataService:fromFirebaseTodo:result>', result);

        if (result.isComplete === undefined) {
            result.isComplete = false;
        }

        return result;
    }
}
