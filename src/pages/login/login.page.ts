import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { SignupPage } from '../signup/signup.page';

// import { Error } from '../../components/error/error.component';

import { LoginService } from '../../services/login.service';

// import { Store } from '@ngrx/store';
// import * as FromRootReducer from '../../reducers';

// import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';
// import { ValidationService } from '../../validation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.page.html',
})
export class LoginPage {
  submitted = false;
  public loginForm: any;

  loginState$: any;

// aaaa: FormControl;

  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public nav: NavController,
    // private store: Store<FromRootReducer.State>,
  ) {
    //
    this.loginState$ = loginService.getLoginState();

    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

// this.aaaa = this.loginForm.username;

  }
/*
https://forum.ionicframework.com/t/form-validation-property-does-not-exist/68309/5

isValid(field: string) {
let formField = this.myForm.get(field);
return formField.valid || formField.pristine;
}
*/

/*
  ngOnInit() {
    console.log('ngOnInit');
    console.log('ngOnInit:this.loginForm>', this.loginForm);
    console.log('ngOnInit:this.loginForm.controls[username]>', this.loginForm.controls['username']);
    this.aaaa = this.loginForm.controls['username'];

   
this.aaaa.valueChanges.subscribe(value => {
      // do something with value here
      console.log('value>', value)
    });
  }
*/

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
    // console.log(this.loginForm.value);
    // console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {

      this.loginService.emailAuthentication(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  signInAnonymously() {
    this.loginService.anonymousAuthentication();
  }

  signInWithGoogle() {
    this.loginService.googleAuthentication();
  }
}
