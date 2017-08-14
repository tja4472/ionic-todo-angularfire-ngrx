import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { TodoService } from '../../services/todo.service';
// import { ItemSelectedOutput, ReorderItemsOutput, TodosInput, TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoCompleted } from '../../models/todo-completed';
import { Validators, FormBuilder } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';

export interface ModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: TodoCompleted;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-todo-completed',
  templateUrl: 'todo-completed.page.html'
})
export class TodoCompletedPage {
  public todoForm: any;

  private todo: TodoCompleted =
  {
    $key: '',
    description: undefined,
    name: '',
    isComplete: false
  };

  private isEditing: boolean;


  constructor(
    private formBuilder: FormBuilder,
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log('params:get>', params.get('todo'));

    let paramTodo: TodoCompleted = params.get('todo');
    this.isEditing = !!paramTodo;

    if (this.isEditing) {
      this.todo = paramTodo;
    }

    this.todoForm = this.formBuilder.group({
      name: [this.todo.name, Validators.required],
      description: [this.todo.description],
      isComplete: [this.todo.isComplete],
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
    let modalResult: ModalResult = {
      isRemoved: false,
      isCancelled: true,
    };
    this.viewController.dismiss(modalResult);
  }

  remove() {
    console.log('remove');
    let modalResult: ModalResult = {
      isRemoved: true,
      isCancelled: false,
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
    let localTodo: TodoCompleted = {
      $key: this.todo.$key,
      description: this.todoForm.value.description,
      name: this.todoForm.value.name,
      isComplete: this.todoForm.value.isComplete
    };

    let modalResult: ModalResult = {
      isRemoved: false,
      isCancelled: false,
      todo: localTodo,      
    };
    this.viewController.dismiss(modalResult);
    // this.viewController.dismiss(localTodo);
  }
}
