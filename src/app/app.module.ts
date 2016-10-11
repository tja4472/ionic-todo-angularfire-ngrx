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
