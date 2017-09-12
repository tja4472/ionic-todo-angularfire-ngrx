import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { TodoCompleted } from '../../shared/models/todo-completed.model';
import { Validators, FormBuilder } from '@angular/forms';

export interface IModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: TodoCompleted;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-modal-todo-completed',
  templateUrl: 'todo-completed-detail.modal.html'
})
export class TodoCompletedDetailModal {
  public todoForm: any;

  private todo: TodoCompleted = new TodoCompleted();

  private isEditing: boolean;


  constructor(
    private formBuilder: FormBuilder,
    navParams: NavParams,
    public viewController: ViewController
  ) {
    // navParams passes by reference.
    const navParamsTodo: Readonly<TodoCompleted> = Object.assign(new TodoCompleted(), navParams.get('todo'));
    //
    console.log('params:get>', navParams.get('todo'));

    // const navParamsTodo: TodoCompleted = navParams.get('todo');
    this.isEditing = !!navParamsTodo;

    if (this.isEditing) {
      this.todo = navParamsTodo;
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
    const localTodo = Object.assign(new TodoCompleted(),
      {
        $key: this.todo.$key,
        description: this.todoForm.value.description,
        name: this.todoForm.value.name,
      });

    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: false,
      todo: localTodo,
    };
    this.viewController.dismiss(modalResult);
    // this.viewController.dismiss(localTodo);
  }
}
