import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedService } from '../../services/todo-completed.service';

import { TodoCompleted } from '../../shared/models/todo-completed.model';
import { IModalResult, TodoCompletedDetailModal } from '../../modals/todo-completed-detail/todo-completed-detail.modal';

@Component({
  selector: 'tja-page-todo-completed-list',
  templateUrl: 'todo-completed-list.page.html'
})
export class TodoCompletedListPage {
  data$: Observable<TodoCompleted[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public todoCompletedService: TodoCompletedService
  ) {
    //
    this.data$ = todoCompletedService.getData();
  }

  ionViewDidLoad() {
    this.todoCompletedService.initialise();
  }

  checkItem(item: TodoCompleted) {
    if (!item.isComplete) {
      this.todoCompletedService.moveToCurrent(item);
    }
  }

  editItem(item: TodoCompleted) {
    console.log('editItem:item>', item);
    const modal = this.modalCtrl.create(TodoCompletedDetailModal, { todo: item });

    //    modal.onDidDismiss(data => {
    modal.onDidDismiss((modalResult: IModalResult) => {
      console.log('editItem:onDidDismiss>: modalResult', modalResult);

      if (modalResult.isCancelled) {
        return;
      }

      if (modalResult.todo === undefined) {
        return;

      }
      if (modalResult.isRemoved) {
        this.todoCompletedService.remove(modalResult.todo);
        return;
      }

      if (modalResult.todo.isComplete) {
        this.todoCompletedService.save(modalResult.todo);
      } else {
        this.todoCompletedService.moveToCurrent(modalResult.todo);
      }
    });

    modal.present();
  }

  toggleCompleteItem(
    item: TodoCompleted,
  ) {
    console.log('toggleCompleteItem:item>', item);

    if (item.isComplete) {
      this.todoCompletedService.moveToCurrent(item);
    }
  }
  /*
    removeItem(item: RemoveItemOutput) {
      console.log('removeItem:item>', item);
      this.todoCompletedService.remove(item);
    }
  */
}
