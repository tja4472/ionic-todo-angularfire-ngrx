import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { TodoCompleted } from '../models/todo-completed';

const FIREBASE_COMPLETED_TODOS = '/todo/completedTodos';

@Injectable()
export class TodoCompletedDataService {
    private fb_CompletedTodos: any; // readonly

    constructor(
        public af: AngularFire
    ) {
        this.fb_CompletedTodos = af.database.list(FIREBASE_COMPLETED_TODOS);
    }

    getData(): Observable<TodoCompleted[]> {
        return this.af.database.list(FIREBASE_COMPLETED_TODOS)
            .map(x => x.map(d => fromFirebaseRecord(d)));
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
    let result: TodoCompleted = {
        $key: x.$key,
        description: x.description,
        name: x.name,
        isComplete: x.isComplete
    };

    if (result.description === undefined) {
        result.description = null;
    }

    return result;
}
