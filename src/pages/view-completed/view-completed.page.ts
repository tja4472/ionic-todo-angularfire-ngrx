import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedService } from '../../services/todo-completed.service';

import {
  DataInput,
  EditItemOutput,
  RemoveItemOutput
} from '../../components/todo-completed-list/todo-completed-list.component';

import { TodoCompleted } from '../../models/todo-completed';
import { TodoCompletedPage } from '../todo-completed/todo-completed.page';

@Component({
  selector: 'page-view-completed',
  templateUrl: 'view-completed.page.html'
})
export class ViewCompletedPage {
  data$: Observable<DataInput>;

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

  editItem(item: EditItemOutput) {
    console.log('editItem:item>', item);
    let modal = this.modalCtrl.create(TodoCompletedPage, { todo: item });

    modal.onDidDismiss((data: TodoCompleted) => {
      console.log('editItem:onDidDismiss>', data);

      if (!!data) {
        if (data.isComplete) {
          this.todoCompletedService.save(data);
        } else {
           this.todoCompletedService.moveToCurrent(data);
        }
      }
    });

    modal.present();
  }

  removeItem(item: RemoveItemOutput) {
    console.log('removeItem:item>', item);
    this.todoCompletedService.remove(item);
  }
}
