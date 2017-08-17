import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

export interface IMyPopoverPageResult {
  clearCompleted: boolean;
}

@Component({
  template: `
    <ion-list>
    <!--
      <ion-list-header>Ionic</ion-list-header>
-->
      <button ion-item (click)="clearCompleted()">Clear completed</button>
    </ion-list>
  `
})
export class MyPopoverPage {
  constructor(public viewCtrl: ViewController) { }

  clearCompleted() {
    const result: IMyPopoverPageResult = {
      clearCompleted: true,
    };

    this.viewCtrl.dismiss(result);
  }

  close(data: string) {
    this.viewCtrl.dismiss(data);
  }
}
