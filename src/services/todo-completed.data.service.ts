import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { TodoCompleted } from '../shared/models/todo-completed.model';

const FIREBASE_COMPLETED_TODOS = '/todo/completedTodos';

@Injectable()
export class TodoCompletedDataService {
    private fbCompletedTodos: any; // readonly

    constructor(
        public af: AngularFireDatabase
    ) {
        this.fbCompletedTodos = af.list(FIREBASE_COMPLETED_TODOS);
    }

    getData(): Observable<TodoCompleted[]> {
        return this.af.list(FIREBASE_COMPLETED_TODOS)
            .map((x) => x.map((d: any) => fromFirebaseRecord(d)));
    }

    removeItem(itemKey: string) {
        this.fbCompletedTodos.remove(itemKey);
    }

    save(item: TodoCompleted) {
        console.log('save>', item);

        if (item.$key === '') {
            // insert.
            this.fbCompletedTodos.push(toFirebaseRecord(item));
        } else {
            // update.
            this.fbCompletedTodos.update(item.$key, toFirebaseRecord(item));
        }
    }
}

interface IFirebaseRecord {
    description?: string;
    name: string;
    isComplete: boolean;
}

function toFirebaseRecord(item: TodoCompleted): IFirebaseRecord {
    //
    const result: IFirebaseRecord = {
        description: item.description,
        isComplete: item.isComplete,
        name: item.name,
    };

    console.log('toFirebaseRecord>', result);
    return result;
}

function fromFirebaseRecord(x: any): TodoCompleted {
    console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
    const result = Object.assign(new TodoCompleted(),
        {
            $key: x.$key,
            description: x.description,
            name: x.name,
        });

    /*
    if (result.description === undefined) {
        result.description = null;
    }
*/
    return result;
}
