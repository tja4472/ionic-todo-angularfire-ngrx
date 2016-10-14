import { ChangeDetectionStrategy, Component } from '@angular/core';

// import { Error } from '../../components/error/error.component';

import { LoginService } from '../../services/login.service';

import { Store } from '@ngrx/store';
// import { LoginActions } from '../../actions';
import * as FromRootReducer from '../../reducers';

// import { LoginSelector } from '../../selectors';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';
// import { ValidationService } from '../../validation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // directives: [ControlMessages, Error],
  templateUrl: 'signup.page.html'
})
export class SignupPage {
  submitted = false;
  public loginForm: FormGroup;

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    // private loginActions: LoginActions,
    private store: Store<FromRootReducer.State>) {
    //
    // this.loginState$ = this.store.let(LoginSelector.getLoginState());
    this.loginState$ = loginService.getLoginState();    
  }

  ionViewDidLoad() {
    //
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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