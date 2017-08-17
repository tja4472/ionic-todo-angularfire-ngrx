import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';


export type ToggleCompleteItemOutput = ITodo;
export type EditItemOutput = ITodo;
// tslint:disable-next-line:interface-over-type-literal
export type ReorderItemsOutput = {
  from: number,
  to: number
};
export type RemoveItemOutput = ITodo;
export type TodosInput = ITodo[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-list',
  templateUrl: 'todo-list.component.html',
})
export class TodoListComponent {
  @Input() public todos: TodosInput;
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<ToggleCompleteItemOutput>();
  @Output() public editItem = new EventEmitter<EditItemOutput>();
  @Output() public reorderItems = new EventEmitter<ReorderItemsOutput>();
  @Output() public removeItem = new EventEmitter<RemoveItemOutput>();
}
