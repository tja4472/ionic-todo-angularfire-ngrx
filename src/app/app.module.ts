import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { CurrentTodoDetailModal } from '../pages/current-todo-detail-modal/current-todo-detail.modal';
import { TodoCompletedPage } from '../pages/todo-completed/todo-completed.page';
import { SignupPage } from '../pages/signup/signup.page';
import { ViewCompletedPage } from '../pages/view-completed/view-completed.page';

import { StatusBar } from '@ionic-native/status-bar';


import { Error } from '../components/error/error.component';
import { MyPopoverPage } from '../components/popover/popover.component';
import { TodoCompletedListComponent } from '../components/todo-completed-list/todo-completed-list.component';
// import { TodoListComponent } from '../components/todo-list/todo-list.component';

// shared
import { CurrentTodoDetailsComponent } from '../shared/components/current-todo-details/current-todo-details.component';

import { ControlMessagesComponent } from '../shared/components/control-messages/control-messages.component';
import { CurrentTodoListComponent } from '../shared/components/current-todo-list/current-todo-list.component';

import { ValidationService } from '../shared/services/validation.service';

import { Fb1DataService } from '../services/fb1.data.service';
import { LoginService } from '../services/login.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompletedService } from '../services/todo-completed.service';
import { TodoDataService } from '../services/todo.data.service';
import { TodoService } from '../services/todo.service';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireOfflineModule } from 'angularfire2-offline';
import { MY_FIREBASE_APP_CONFIG } from './my-firebase-app-config';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from '../reducers/index';

import { LoginEffects } from '../effects/login.effect';
import { TodoCompletedEffects } from '../effects/todo-completed.effect';
import { TodoEffects } from '../effects/todo.effect';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@NgModule({
  declarations: [
    ControlMessagesComponent,
    Error,
    MyPopoverPage,
    CurrentTodoDetailsComponent,
    CurrentTodoListComponent,
    TodoCompletedListComponent,
    // TodoListComponent,
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    TodoCompletedPage,
    CurrentTodoDetailModal,
    SignupPage,
    ViewCompletedPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MY_FIREBASE_APP_CONFIG),
    // AngularFireOfflineModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      LoginEffects,
      TodoCompletedEffects,
      TodoEffects,
    ]),
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    TodoCompletedPage,
    CurrentTodoDetailModal,
    SignupPage,
    ViewCompletedPage,
    MyPopoverPage,
  ],
  providers: [
    Fb1DataService,
    LoginService,
    StatusBar,
    TodoCompletedDataService,
    TodoCompletedService,
    TodoDataService,
    TodoService,
    ValidationService,
  ]
})
export class AppModule { }

/*
so I need some initial state loaded before angular does anything.. for example
the user may already be logged in and I need to load up their user information..
where should I put that code? currently I put it in my services constructor
(where it dispatches the load user action) but I'm hitting auth guards before
the services constructor

AppModule constructor
https://gitter.im/ngrx/store?at=57fe27d14fde7203142e2bb7
*/
