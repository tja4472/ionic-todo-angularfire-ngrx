import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

// import { Error } from '../../components/error/error.component';

import { LoginService } from '../../services/login.service';

// import { LoginSelector } from '../../selectors';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';
// import { ValidationService } from '../../validation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-signup',
  templateUrl: 'signup.page.html',
})
export class SignupPage {
  submitted = false;
  public loginForm: any;

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    // private loginActions: LoginActions,
  ) {
    //
    // this.loginState$ = this.store.let(LoginSelector.getLoginState());
    this.loginState$ = loginService.getLoginState();

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
  /*
    ionViewDidLoad() {
      //
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  */

  logForm() {
    console.log(this.loginForm.value);
    console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {
      this.loginService.createUser(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
    }
  }
}
