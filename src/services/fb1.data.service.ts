import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { ToDo } from '../models/todo';
import { TodoCompleted } from '../models/todo-completed';
import { TodoDataService } from '../services/todo.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';

// const FIREBASE_KEY = '/todoCompleted';

@Injectable()
export class Fb1DataService {
    constructor(
        public af: AngularFire,
        private todoCompletedDataService: TodoCompletedDataService,
        private todoDataService: TodoDataService
    ) { }

    clearCompletedTodos(items: ToDo[]) {
        console.log('clearCompletedTodos>', items);

        items.map(x => {
            console.log('x>', x);
            let todoCompleted: TodoCompleted = {
                $key: '',
                description: x.description,
                name: x.name,
                isComplete: x.isComplete
            };

            this.todoCompletedDataService.save(todoCompleted);
            this.todoDataService.removeItem(x.$key);
        });
    }

    moveToCuurent(item: TodoCompleted) {
        console.log('moveToCuurent>', item);
        let todo: ToDo = {
            $key: item.$key,
            description: item.description,
            name: item.name,
            isComplete: item.isComplete,
            index: 0
        };

        this.todoDataService.save(todo);
        this.todoCompletedDataService.removeItem(item.$key);
    }
}
