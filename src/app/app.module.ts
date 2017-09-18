import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RegisterPage } from '../pages/register/register.page';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { TodoCompletedListPage } from '../pages/todo-completed-list/todo-completed-list.page';
import { TodoListPage } from '../pages/todo-list/todo-list.page';

import { TodoCompletedDetailModal } from '../modals/todo-completed-detail/todo-completed-detail.modal';
import { TodoDetailModal } from '../modals/todo-detail/todo-detail.modal';

import { Error } from '../components/error/error.component';
import { TodoListPopover } from '../components/todo-list-popover/todo-list.popover';

// shared
import { ControlMessagesComponent } from '../shared/components/control-messages/control-messages.component';
import { CreateUserComponent } from '../shared/components/create-user/create-user.component';
import { SignInComponent } from '../shared/components/sign-in/sign-in.component';
// tslint:disable-next-line:max-line-length
import { TodoCompletedDetailComponent } from '../shared/components/todo-completed-detail/todo-completed-detail.component';
import { TodoCompletedListComponent } from '../shared/components/todo-completed-list/todo-completed-list.component';
import { TodoDetailComponent } from '../shared/components/todo-detail/todo-detail.component';
import { TodoListComponent } from '../shared/components/todo-list/todo-list.component';
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

import { metaReducers, reducers } from '../reducers/index';

import { LoginEffects } from '../effects/login.effect';
import { TodoCompletedEffects } from '../effects/todo-completed.effect';
import { TodoEffects } from '../effects/todo.effect';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@NgModule({
  declarations: [
    CreateUserComponent,
    ControlMessagesComponent,
    Error,
    SignInComponent,
    TodoListPopover,
    TodoDetailComponent,
    TodoListComponent,
    TodoCompletedDetailComponent,
    TodoCompletedListComponent,
    MyApp,
    Page1,
    Page2,
    TodoListPage,
    SignInPage,
    TodoCompletedDetailModal,
    TodoDetailModal,
    RegisterPage,
    TodoCompletedListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MY_FIREBASE_APP_CONFIG),
    // AngularFireOfflineModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers, { metaReducers }),
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
    TodoListPage,
    SignInPage,
    TodoCompletedDetailModal,
    TodoDetailModal,
    RegisterPage,
    TodoCompletedListPage,
    TodoListPopover,
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
