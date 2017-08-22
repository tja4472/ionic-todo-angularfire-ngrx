import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoCompleted } from '../../shared/models/todo-completed.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Checkbox } from 'ionic-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-completed-list',
  templateUrl: 'todo-completed-list.component.html',
})
export class TodoCompletedListComponent {
  @Input() public data: TodoCompleted[];

  @Output() public checkItem = new EventEmitter<TodoCompleted>();
  @Output() public editItem = new EventEmitter<TodoCompleted>();
  // @Output() public removeItem = new EventEmitter<RemoveItemOutput>();

  // public searchControl;
public myGroup: any;

  constructor() {
    this.myGroup = new FormGroup({
       searchControl: new FormControl()
    });

    // this.searchControl = this.myGroup.searchControl
  }

  checkboxChange(checkbox: Checkbox, item: TodoCompleted) {
    item.isComplete = checkbox.checked;
    this.checkItem.emit(item);
  }

  ionItem(item: any) {
    console.log('ionItem>>', item);
  }
}
