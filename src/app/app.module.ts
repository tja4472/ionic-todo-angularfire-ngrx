import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { AngularFireModule } from 'angularfire2';

// Bodge: error TS2503: Cannot find namespace 'firebase'.
// tslint:disable-next-line:no-unused-variable
import * as firebase from 'firebase';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

firebase.initializeApp(MyFirebaseAppConfig.config)

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: []
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