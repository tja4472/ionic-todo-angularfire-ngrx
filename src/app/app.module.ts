import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { TodoPage } from '../pages/todo/todo.page';
import { TodoCompletedPage } from '../pages/todo-completed/todo-completed.page';
import { SignupPage } from '../pages/signup/signup.page';
import { ViewCompletedPage } from '../pages/view-completed/view-completed.page';

import { ControlMessages } from '../components/control-messages/control-messages.component';
import { Error } from '../components/error/error.component';
import { PopoverPage } from '../components/popover/popover.component';
import { TodoCompletedListComponent } from '../components/todo-completed-list/todo-completed-list.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

import { Fb1DataService } from '../services/fb1.data.service';
import { LoginService } from '../services/login.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompletedService } from '../services/todo-completed.service';
import { TodoDataService} from '../services/todo.data.service';
import { TodoService } from '../services/todo.service';
import { ValidationService } from '../services/validation.service';


import { AngularFireModule } from 'angularfire2';

// Bodge: error TS2503: Cannot find namespace 'firebase'.
// tslint:disable-next-line:no-unused-variable
import * as firebase from 'firebase';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../reducers';

import { LoginEffects } from '../effects/login.effect';
import { TodoCompletedEffects } from '../effects/todo-completed.effect';
import { TodoEffects } from '../effects/todo.effect';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

firebase.initializeApp(MyFirebaseAppConfig.config)

@NgModule({
  declarations: [
    ControlMessages,
    Error,
    PopoverPage,
    TodoCompletedListComponent,
    TodoListComponent,    
    MyApp,
    Page1,
    Page2,
    HomePage,
    // LoginPage,
    // TodoCompletedPage,
    TodoPage,
    // SignupPage,
    // ViewCompletedPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),    
    StoreModule.provideStore(reducer),
    EffectsModule.run(LoginEffects),    
    EffectsModule.run(TodoCompletedEffects),
    EffectsModule.run(TodoEffects),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    PopoverPage,
    // LoginPage,
    // TodoCompletedPage,
    TodoPage,
    // SignupPage,
    // ViewCompletedPage,    
  ],
  providers: [
    Fb1DataService,
    LoginService,
    TodoCompletedDataService,
    TodoCompletedService,
    TodoDataService,
    TodoService,
    ValidationService,
  ]
})
export class AppModule {}

/*
so I need some initial state loaded before angular does anything.. for example 
the user may already be logged in and I need to load up their user information.. 
where should I put that code? currently I put it in my services constructor 
(where it dispatches the load user action) but I'm hitting auth guards before 
the services constructor

AppModule constructor
https://gitter.im/ngrx/store?at=57fe27d14fde7203142e2bb7
*/