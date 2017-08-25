import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

export interface ITodoListPopoverResult {
  clearCompleted: boolean;
}

@Component({
  templateUrl: 'todo-list.popover.html'
})
export class TodoListPopover {
  private readonly CLASS_NAME = 'TodoListPopover';

  constructor(
    public viewCtrl: ViewController
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }

  clearCompleted() {
    const result: ITodoListPopoverResult = {
      clearCompleted: true,
    };

    this.viewCtrl.dismiss(result);
  }
}
