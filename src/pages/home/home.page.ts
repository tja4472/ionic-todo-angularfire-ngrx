import { Component } from '@angular/core';
import { ActionSheetController, NavController, ModalController, PopoverController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';
import {
  EditItemOutput,
  RemoveItemOutput,
  ToggleCompleteItemOutput,
  ReorderItemsOutput,
  TodosInput
} from '../../components/todo-list/todo-list.component';
import { MyPopoverPage } from '../../components/popover/popover.component';
import { ToDo } from '../../models/todo';
import { TodoPage } from '../todo/todo.page';
// import { assign } from '../../utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  todos$: Observable<TodosInput>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private todoService: TodoService) {
    //
    this.todos$ = todoService.getData();
  }

  ionViewDidLoad() {
    this.todoService.initialise();
  }

  addItem() {
    console.log('addItem');
    let modal = this.modalCtrl.create(TodoPage);

    modal.onDidDismiss((data: ToDo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  toggleCompleteItem(item: ToggleCompleteItemOutput) {
    console.log('completeItem:item>', item);
    item.isComplete = !item.isComplete;
    this.todoService.save(item);

    /*
        if (item.isComplete) {
          this.presentActionSheet();
        }
    */
  }

  editItem(item: EditItemOutput) {
    console.log('editItem:item>', item);
    // let todo: ToDo;
    // todo = assign(todo, item);


    let modal = this.modalCtrl.create(TodoPage, { todo: item });

    modal.onDidDismiss((data: ToDo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Clear completed?',
          handler: () => {
            console.log('Clear completed clicked');
            this.todoService.clearCompletedItems();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(MyPopoverPage);

    popover.onDidDismiss((data: string) => {
      if (data === 'ClearCompleted') {
        this.todoService.clearCompletedItems();
      }
    });

    popover.present({
      ev: ev
    });
  }

  reorderItems(indexes: ReorderItemsOutput) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: RemoveItemOutput) {
    console.log('removeItem:item>', item);
    this.todoService.remove(item);
  }
}

/*
@Component({
  template: `
    <ion-list>
    <!--
      <ion-list-header>Ionic</ion-list-header>
-->      
      <button ion-item (click)="close('ClearCompleted')">Clear completed</button>
    </ion-list>
  `
})
class PopoverPage {
  constructor(private viewCtrl: ViewController) { }

  close(data: string) {
    this.viewCtrl.dismiss(data);
  }
}
*/
