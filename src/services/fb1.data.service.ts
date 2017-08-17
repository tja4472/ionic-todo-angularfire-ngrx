import { Injectable } from '@angular/core';

import { IToDo } from '../models/todo.model';
import { ITodoCompleted } from '../models/todo-completed';
import { TodoDataService } from '../services/todo.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';

// const FIREBASE_KEY = '/todoCompleted';

@Injectable()
export class Fb1DataService {
    constructor(
        private todoCompletedDataService: TodoCompletedDataService,
        private todoDataService: TodoDataService
    ) { }

    clearCompletedTodos(items: IToDo[]) {
        console.log('clearCompletedTodos>', items);

        items.map((x) => {
            console.log('x>', x);
            const todoCompleted: ITodoCompleted = {
                $key: '',
                description: x.description,
                isComplete: x.isComplete,
                name: x.name,
            };

            this.todoCompletedDataService.save(todoCompleted);
            this.todoDataService.removeItem(x.$key);
        });
    }

    moveToCuurent(item: ITodoCompleted) {
        console.log('moveToCuurent>', item);
        const todo: IToDo = {
            $key: item.$key,
            description: item.description,
            index: 0,
            isComplete: item.isComplete,
            name: item.name,
            userId: '',
        };

        this.todoDataService.save(todo);
        this.todoCompletedDataService.removeItem(item.$key);
    }
}
