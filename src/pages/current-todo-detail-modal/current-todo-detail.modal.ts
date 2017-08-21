import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo } from '../../shared/models/todo.model';

@Component({
  selector: 'tja-modal-current-todo-detail',
  templateUrl: 'current-todo-detail.modal.html',
})
export class CurrentTodoDetailModal {
  // Called from template.
  public todo: Todo;

  /*
    private _todo: ITodo =
    {
      $key: undefined,
      description: undefined,
      index: 0,
      isComplete: false,
      name: '',
      userId: '',
    };
  */
  // private isEditing: boolean;

  constructor(
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log('params>', params);
    console.log('params:get>', params.get('todo'));

    const paramTodo: Todo = params.get('todo');



    if (paramTodo) {
      //  this.todo = Object.assign(this.todo, paramTodo);
      console.log('paramTodo = true');
      this.todo = paramTodo;
    } else {
      console.log('paramTodo = false');
      this.todo = new Todo();
    }
    console.log('this.todo>', this.todo);

    /*
        this.isEditing = !!paramTodo;

        if (this.isEditing) {
          console.log('isEditing');
          this._todo = paramTodo;
        }
        this.todo = this._todo;
        console.log('+++this.todo>', this.todo);
    */

  }

  // Called from template.
  itemCancelled() {
    console.log('itemCancelled>');
    this.viewController.dismiss();
  }

  // Called from template.
  itemSaved(item: Todo) {
    console.log('itemSaved>', item);
    this.viewController.dismiss(item);
  }
}