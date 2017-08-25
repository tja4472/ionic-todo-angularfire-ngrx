import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IReorderArrayIndexes } from '../../models/reorder-array-indexes.model';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'tja-todo-list',
  templateUrl: 'todo-list.component.html',
})
export class TodoListComponent {

  @Input() public todos: Todo[];
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<Todo>();
  @Output() public editItem = new EventEmitter<Todo>();
  @Output() public reorderItems = new EventEmitter<IReorderArrayIndexes>();
  @Output() public removeItem = new EventEmitter<Todo>();

  private readonly CLASS_NAME = 'TodoListComponent';

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
