import { Injectable } from '@angular/core';

import { Todo } from '../shared/models/todo.model';

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

    clearCompletedTodos(items: Todo[]) {
        console.log('clearCompletedTodos>', items);

        items.map((x: Todo) => {
            console.log('x>', x);
            if (x.$key === undefined) {
                return;
            }
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

        const todo: Todo = new Todo();
        todo.description = item.description;
        todo.isComplete = item.isComplete;
        todo.name = item.name;

        /*
                const todo: ITodo = {
                    $key: item.$key,
                    description: item.description,
                    index: 0,
                    isComplete: item.isComplete,
                    name: item.name,
                    userId: '',
                };
        */
        this.todoDataService.save(todo);
        this.todoCompletedDataService.removeItem(item.$key);
    }
}
