import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { TodoCompleted } from '../models/todo-completed';

const FIREBASE_COMPLETED_TODOS = '/todo/completedTodos';

@Injectable()
export class TodoCompletedDataService {
    private fb_CompletedTodos: any; // readonly

    constructor(
        public af: AngularFireDatabase
    ) {
        this.fb_CompletedTodos = af.list(FIREBASE_COMPLETED_TODOS);
    }

    getData(): Observable<TodoCompleted[]> {
        return this.af.list(FIREBASE_COMPLETED_TODOS)
            .map(x => x.map((d: any) => fromFirebaseRecord(d)));
    }

    removeItem(itemKey: string) {
        this.fb_CompletedTodos.remove(itemKey);
    }

    save(item: TodoCompleted) {
        console.log('save>', item);

        if (item.$key === '') {
            // insert.
            this.fb_CompletedTodos.push(toFirebaseRecord(item));
        } else {
            // update.
            this.fb_CompletedTodos.update(item.$key, toFirebaseRecord(item));
        }
    }
}

interface FirebaseRecord {
    description?: string;
    name: string;
    isComplete: boolean;
}

function toFirebaseRecord(item: TodoCompleted): FirebaseRecord {
    //
    let result: FirebaseRecord = {
        description: item.description,
        name: item.name,
        isComplete: item.isComplete
    };

    console.log('toFirebaseRecord>', result);
    return result;
}

function fromFirebaseRecord(x: any): TodoCompleted {
    console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
    let result: TodoCompleted = {
        $key: x.$key,
        description: x.description,
        name: x.name,
        isComplete: x.isComplete
    };

    /*
    if (result.description === undefined) {
        result.description = null;
    }
*/
    return result;
}
