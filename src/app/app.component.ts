import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { ViewCompletedPage } from '../pages/view-completed/view-completed.page';

import { LoginService } from '../services/login.service';

export interface PageInterface {
  title: string;
  component: any;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any; // = Page1;
  loginState$: any;
  pages: PageInterface[];

  constructor(
    private loginService: LoginService,
    public platform: Platform,
    public statusBar: StatusBar,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Current todos', component: HomePage },
      { title: 'Completed todos', component: ViewCompletedPage },
      { title: 'Login', component: LoginPage },
      { title: 'Signup', component: SignupPage },
      { title: 'Logout', component: LoginPage, logsOut: true },
    ];

    // loginService.initialise();

    this.loginState$ = loginService.getLoginState();

    /*
        loginService.getLoginState()
          .subscribe(loginState => {
            console.log('loginState>', loginState);
            console.log('loginState.isAuthenticated>', loginState.isAuthenticated);
            console.log('loginState.isAuthenticating>', loginState.isAuthenticating);
    
            if (loginState.isAuthenticating) {
              // this.rootPage = Page1;
            } else if (loginState.isAuthenticated) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          });
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform.ready()');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.loginService.auth$.subscribe(firebaseUser => {
        console.log('>>>>>>>>>>firebaseUser>', firebaseUser);
        if (firebaseUser) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
/*
      this.loginService.getLoginState()
        .subscribe(loginState => {
          console.log('loginState>', loginState);
          console.log('loginState.isAuthenticated>', loginState.isAuthenticated);
          console.log('loginState.isAuthenticating>', loginState.isAuthenticating);

          if (loginState.isAuthenticating) {
            // this.rootPage = Page1;
          } else if (loginState.isAuthenticated) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        });
*/
    });

  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.loginService.logout()
      }, 1000);
    }
  }
}
