import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { ITodoCompleted } from '../models/todo-completed';

const FIREBASE_COMPLETED_TODOS = '/todo/completedTodos';

@Injectable()
export class TodoCompletedDataService {
    private fbCompletedTodos: any; // readonly

    constructor(
        public af: AngularFireDatabase
    ) {
        this.fbCompletedTodos = af.list(FIREBASE_COMPLETED_TODOS);
    }

    getData(): Observable<ITodoCompleted[]> {
        return this.af.list(FIREBASE_COMPLETED_TODOS)
            .map((x) => x.map((d: any) => fromFirebaseRecord(d)));
    }

    removeItem(itemKey: string) {
        this.fbCompletedTodos.remove(itemKey);
    }

    save(item: ITodoCompleted) {
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

function toFirebaseRecord(item: ITodoCompleted): IFirebaseRecord {
    //
    const result: IFirebaseRecord = {
        description: item.description,
        isComplete: item.isComplete,
        name: item.name,
    };

    console.log('toFirebaseRecord>', result);
    return result;
}

function fromFirebaseRecord(x: any): ITodoCompleted {
    console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
    const result: ITodoCompleted = {
        $key: x.$key,
        description: x.description,
        isComplete: x.isComplete,
        name: x.name,
    };

    /*
    if (result.description === undefined) {
        result.description = null;
    }
*/
    return result;
}
