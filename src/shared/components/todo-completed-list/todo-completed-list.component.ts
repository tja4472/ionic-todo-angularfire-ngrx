import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoCompleted } from '../../models/todo-completed.model';

@Component({
  selector: 'tja-todo-completed-list',
  templateUrl: 'todo-completed-list.component.html',
})
export class TodoCompletedListComponent {
  @Input() public data: TodoCompleted[];

  @Output() public editItem = new EventEmitter<TodoCompleted>();
  @Output() public toggleCompleteItem = new EventEmitter<TodoCompleted>();

  private readonly CLASS_NAME = 'CompletedTodoListComponent';

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
