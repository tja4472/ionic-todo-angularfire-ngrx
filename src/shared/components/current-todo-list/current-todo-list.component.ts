import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IReorderArrayIndexes } from '../../models/reorder-array-indexes';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'tja-current-todo-list',
  templateUrl: 'current-todo-list.component.html',
})
export class CurrentTodoListComponent {

  @Input() public todos: Todo[];
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<Todo>();
  @Output() public editItem = new EventEmitter<Todo>();
  @Output() public reorderItems = new EventEmitter<IReorderArrayIndexes>();
  @Output() public removeItem = new EventEmitter<Todo>();

  private readonly CLASS_NAME = 'CurrentTodoListComponent';

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
