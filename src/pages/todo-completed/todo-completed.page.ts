import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ITodoCompleted } from '../../models/todo-completed';
import { Validators, FormBuilder } from '@angular/forms';

export interface IModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: ITodoCompleted;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-todo-completed',
  templateUrl: 'todo-completed.page.html'
})
export class TodoCompletedPage {
  public todoForm: any;

  private todo: ITodoCompleted =
  {
    $key: '',
    description: undefined,
    isComplete: false,
    name: '',
  };

  private isEditing: boolean;


  constructor(
    private formBuilder: FormBuilder,
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log('params:get>', params.get('todo'));

    const paramTodo: ITodoCompleted = params.get('todo');
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
    const modalResult: IModalResult = {
      isCancelled: true,
      isRemoved: false,
    };
    this.viewController.dismiss(modalResult);
  }

  remove() {
    console.log('remove');
    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: true,
      todo: this.todo,
    };
    this.viewController.dismiss(modalResult);
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
    const localTodo: ITodoCompleted = {
      $key: this.todo.$key,
      description: this.todoForm.value.description,
      isComplete: this.todoForm.value.isComplete,
      name: this.todoForm.value.name,
    };

    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: false,
      todo: localTodo,
    };
    this.viewController.dismiss(modalResult);
    // this.viewController.dismiss(localTodo);
  }
}
