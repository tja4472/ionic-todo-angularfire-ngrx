import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { TodoCompleted } from '../../shared/models/todo-completed.model';

export interface IModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: TodoCompleted;
}

@Component({
  selector: 'tja-modal-todo-completed-detail',
  templateUrl: 'todo-completed-detail.modal.html'
})
export class TodoCompletedDetailModal {
  public viewTodoCompleted: TodoCompleted;

  private readonly CLASS_NAME = 'TodoCompletedDetailModal';

  constructor(
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    // navParams passes by reference.
    const navParamsTodo: Readonly<TodoCompleted> = Object.assign(new TodoCompleted(), navParams.get('todo'));

    // console.log('params:get>', navParams.get('todo'));
    // const navParamsTodo: TodoCompleted = navParams.get('todo');
    this.viewTodoCompleted = Object.assign(new TodoCompleted(), navParamsTodo);
    console.log('this.viewTodoCompleted>', this.viewTodoCompleted);
  }

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    const modalResult: IModalResult = {
      isCancelled: true,
      isRemoved: false,
    };
    this.viewController.dismiss(modalResult);
  }

  public viewItemRemove() {
    console.log('viewItemRemove');
    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: true,
      todo: this.viewTodoCompleted,
    };
    this.viewController.dismiss(modalResult);
  }

  public viewItemSaved(item: TodoCompleted) {
    console.log('viewItemSaved>', item);
    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: false,
      todo: item,
    };

    this.viewController.dismiss(modalResult);
  }
  /*
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
        todo: this.viewTodoCompleted,
      };
      this.viewController.dismiss(modalResult);
    }

    save() {
      console.log('save');

      if (!this.todoForm.valid) {
        return;
      }

      console.log('this.todoForm.value>', this.todoForm.value);
      console.log('this.todoForm.status>', this.todoForm.status);

      this.viewTodoCompleted = this.prepareSaveData();
      // console.log('localTodo>', this.todo);

      const modalResult: IModalResult = {
        isCancelled: false,
        isRemoved: false,
        todo: this.viewTodoCompleted,
      };

      this.viewController.dismiss(modalResult);
    }

  private createForm(): void {
    this.todoForm = this.formBuilder.group({
      description: [this.viewTodoCompleted.description],
      isComplete: [this.viewTodoCompleted.isComplete],
      name: [this.viewTodoCompleted.name, Validators.required],
    });
  }

  private prepareSaveData(): TodoCompleted {
    const formModel = this.todoForm.value;

    const saveData: TodoCompleted = new TodoCompleted();
    saveData.description = formModel.description;
    saveData.$key = this.viewTodoCompleted.$key;
    saveData.name = formModel.name;
    saveData.userId = this.viewTodoCompleted.userId;

    return saveData;
  }
  */
}
