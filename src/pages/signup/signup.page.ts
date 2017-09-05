import { Component } from '@angular/core';

import { LoginService } from '../../services/login.service';

import { IUserFormResult } from '../../shared/components/create-user/create-user.component';

@Component({
  selector: 'tja-page-signup',
  templateUrl: 'signup.page.html',
})
export class SignupPage {
  // Used in view
  public error$: any;

  private readonly CLASS_NAME = 'SignupPage';

  constructor(
    private loginService: LoginService,
  ) {
    console.log('%s:constructor', this.CLASS_NAME);
    this.error$ = loginService.error$();
  }

  // Used in view
  public createUser(x: IUserFormResult) {
    console.log('###%s:createUser', this.CLASS_NAME);
    console.log('%s:x>', this.CLASS_NAME, x);
    // this.authService.createUserWithEmailAndPassword(x.email, x.password);
    this.loginService.createUser(x.email, x.password);
  }

  public ionViewDidLeave() {
    console.log('###%s:ionViewDidLeave', this.CLASS_NAME);
    this.loginService.clearError$();
  }
}
