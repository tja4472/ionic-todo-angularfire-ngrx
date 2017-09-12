import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo } from '../../shared/models/todo.model';

@Component({
  selector: 'tja-modal-todo-detail',
  templateUrl: 'todo-detail.modal.html',
})
export class TodoDetailModal {
  // Called from view.
  public viewTodo: Todo;

  private readonly CLASS_NAME = 'TodoDetailModal';

  constructor(
    navParams: NavParams,
    public viewController: ViewController
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    // navParams passes by reference.
    const navParamsTodo: Readonly<Todo> = Object.assign(new Todo(), navParams.get('todo'));
    console.log('navParamsTodo>', navParamsTodo);
    console.log('navParamsTodo.isNew()>', navParamsTodo.isNew());

    this.viewTodo = Object.assign(new Todo(), navParamsTodo);
    console.log('this.todo>', this.viewTodo);
    /*
    if (navParamsTodo) {
      //  this.todo = Object.assign(this.todo, paramTodo);
      console.log('paramTodo = true');
      this.viewTodo = Object.assign(new Todo(), navParamsTodo);
    } else {
      console.log('paramTodo = false');
      this.viewTodo = new Todo();
    }
    */


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

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    this.viewController.dismiss();
  }

  public viewItemSaved(item: Todo) {
    console.log('viewItemSaved>', item);
    this.viewController.dismiss(item);
  }
}
