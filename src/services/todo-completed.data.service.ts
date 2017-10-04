import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { TodoCompleted } from '../shared/models/todo-completed.model';

const FIREBASE_COMPLETED_TODOS = '/todo/completedTodos';

interface IFirebaseRecord {
    description?: string;
    name: string;
    isComplete: boolean;
}

@Injectable()
export class TodoCompletedDataService {
    private fbCompletedTodos: any; // readonly

    constructor(
        public af: AngularFireDatabase
    ) {
        this.fbCompletedTodos = af.list(FIREBASE_COMPLETED_TODOS);
    }

    getData(): Observable<TodoCompleted[]> {
        return this.af.list(
            FIREBASE_COMPLETED_TODOS)
            .snapshotChanges()
            .map((actions) => actions.map((action) => {
                if ((action === null)
                    || (action.payload === null)
                    || (action.payload.key === null)
                ) {
                    return new TodoCompleted();
                }

                const $key = action.payload.key;
                const data = { $key, ...action.payload.val() };

                return this.fromFirebaseRecord(data);
            }));
    }

    removeItem(itemKey: string) {
        this.fbCompletedTodos.remove(itemKey);
    }

    save(item: TodoCompleted) {
        console.log('save>', item);

        if (item.isNew()) {
            // insert.
            this.fbCompletedTodos.push(this.toFirebaseRecord(item));
        } else {
            // update.
            this.fbCompletedTodos.update(item.$key, this.toFirebaseRecord(item));
        }
    }

    private toFirebaseRecord(item: TodoCompleted): IFirebaseRecord {
        //
        const result: IFirebaseRecord = {
            description: item.description,
            isComplete: item.isComplete,
            name: item.name,
        };

        console.log('toFirebaseRecord>', result);
        return result;
    }


    private fromFirebaseRecord(x: any): TodoCompleted {
        console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
        const result = new TodoCompleted(
            {
                $key: x.$key,
                description: x.description,
                name: x.name,
            });

        return result;
    }
}
