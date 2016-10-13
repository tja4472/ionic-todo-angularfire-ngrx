import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoCompleted } from '../../models/todo-completed';

export type EditItemOutput = TodoCompleted;
export type RemoveItemOutput = TodoCompleted;

export type DataInput = TodoCompleted[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-completed-list',
  templateUrl: 'todo-completed-list.component.html',
})
export class TodoCompletedListComponent {
  @Input() public data: DataInput;

  @Output() public editItem = new EventEmitter<EditItemOutput>();
  @Output() public removeItem = new EventEmitter<RemoveItemOutput>();

  constructor() {
  }
}
