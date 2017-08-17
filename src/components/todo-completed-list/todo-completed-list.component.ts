import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoCompleted } from '../../models/todo-completed';
import { FormControl, FormGroup } from '@angular/forms';
import { Checkbox } from 'ionic-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-completed-list',
  templateUrl: 'todo-completed-list.component.html',
})
export class TodoCompletedListComponent {
  @Input() public data: ITodoCompleted[];

  @Output() public checkItem = new EventEmitter<ITodoCompleted>();
  @Output() public editItem = new EventEmitter<ITodoCompleted>();
  // @Output() public removeItem = new EventEmitter<RemoveItemOutput>();

  // public searchControl;
public myGroup: any;

  constructor() {
    this.myGroup = new FormGroup({
       searchControl: new FormControl()
    });

    // this.searchControl = this.myGroup.searchControl
  }

  checkboxChange(checkbox: Checkbox, item: ITodoCompleted) {
    item.isComplete = checkbox.checked;
    this.checkItem.emit(item);
  }

  ionItem(item: any) {
    console.log('ionItem>>', item);
  }
}
