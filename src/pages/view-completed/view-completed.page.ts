import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedService } from '../../services/todo-completed.service';

/*
import {
  DataInput,
  EditItemOutput,
  RemoveItemOutput
} from '../../components/todo-completed-list/todo-completed-list.component';
*/

import { ITodoCompleted } from '../../models/todo-completed';
import { IModalResult, TodoCompletedPage } from '../todo-completed/todo-completed.page';

@Component({
  selector: 'page-view-completed',
  templateUrl: 'view-completed.page.html'
})
export class ViewCompletedPage {
  data$: Observable<ITodoCompleted[]>;

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

  checkItem(item: ITodoCompleted) {
    if (!item.isComplete) {
      this.todoCompletedService.moveToCurrent(item);
    }
  }

  editItem(item: ITodoCompleted) {
    console.log('editItem:item>', item);
    const modal = this.modalCtrl.create(TodoCompletedPage, { todo: item });

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
  /*
    removeItem(item: RemoveItemOutput) {
      console.log('removeItem:item>', item);
      this.todoCompletedService.remove(item);
    }
  */
}
