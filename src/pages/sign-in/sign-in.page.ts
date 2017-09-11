import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register.page';

import { LoginService } from '../../services/login.service';

import { ISignInComponentResult } from '../../shared/components/sign-in/sign-in.component';

// changeDetection: ChangeDetectionStrategy.OnPush,

@Component({
  selector: 'tja-page-sign-in',
  templateUrl: 'sign-in.page.html',
})
export class SignInPage {
  // Used in view
  public viewError$: any;

  private readonly CLASS_NAME = 'SignInPage';

  constructor(
    public loginService: LoginService,
    public nav: NavController,
  ) {
    console.log('%s:constructor', this.CLASS_NAME);
    this.viewError$ = loginService.error$();
  }

  public ionViewDidLeave() {
    console.log('###%s:ionViewDidLeave', this.CLASS_NAME);
    this.loginService.clearError$();
  }

  public viewRegister(): void {
    console.log('viewRegister>');
    // Should be root.
    this.nav.setRoot(RegisterPage);
  }

  public viewSignIn(x: ISignInComponentResult): void {
    console.log('viewSignIn>', x);
    this.loginService.emailAuthentication(x.email, x.password);
  }
}
