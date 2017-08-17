import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IToDo } from '../../models/todo.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-todo',
  templateUrl: 'todo.page.html',
})
export class TodoPage {
  public todoForm: any;

  private todo: IToDo =
  {
    $key: '',
    description: undefined,
    index: 0,
    isComplete: false,
    name: '',
    userId: '',
  };

  private isEditing: boolean;

  constructor(
    public formBuilder: FormBuilder,
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log('params:get>', params.get('todo'));

    const paramTodo: IToDo = params.get('todo');
    this.isEditing = !!paramTodo;

    if (this.isEditing) {
      this.todo = paramTodo;
    }

    this.todoForm = this.formBuilder.group({
      description: [this.todo.description],
      isComplete: [this.todo.isComplete],
      name: [this.todo.name, Validators.required],
    });
  }

  /*
    ionViewDidLoad() {
      //
      this.todoForm = this.formBuilder.group({
        name: [this.todo.name, Validators.required],
        description: [this.todo.description],
        isComplete: [this.todo.isComplete]
      });
    }
  */

  dismiss() {
    console.log('dismiss');
    this.viewController.dismiss();
  }

  save() {
    console.log('save');

    if (!this.todoForm.valid) {
      return;
    }

    console.log(this.todoForm.value);
    console.log('this.todo>', this.todo);

    // Get error here with private todo when using popover.
    // Hence local.

    const localTodo = Object.assign(this.todo, {
      isComplete: this.todoForm.value.isComplete,
      name: this.todoForm.value.name,
    });

    // assign did not like optional property.
    localTodo.description = this.todoForm.value.description;
    /*
    let localTodo: ToDo = {
        $key: this.todo.$key,
        description: this.todoForm.value.description,
        name: this.todoForm.value.name,
        index: this.todo.index,
        isComplete: this.todoForm.value.isComplete
      };
*/
    this.viewController.dismiss(localTodo);
  }
}
