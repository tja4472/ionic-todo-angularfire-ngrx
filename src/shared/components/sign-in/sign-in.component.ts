import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ISignInComponentResult {
    email: string;
    password: string;
}

@Component({
    selector: 'tja-sign-in',
    templateUrl: 'sign-in.component.html',
})
export class SignInComponent {

    @Input() public error: any;

    @Output() public signIn = new EventEmitter<ISignInComponentResult>();
    @Output() public register = new EventEmitter();

    public signupForm: FormGroup;
    private readonly CLASS_NAME = 'SignInComponent';

    constructor(
        public formBuilder: FormBuilder,
    ) {
        console.log('###%s:constructor', this.CLASS_NAME);
        this.createForm();
    }

    public createUserClicked() {
        console.log('###%s:createUserClicked', this.CLASS_NAME);
        console.log('%s:username>', this.CLASS_NAME, this.signupForm.value.username);
        console.log('%s:password>', this.CLASS_NAME, this.signupForm.value.password);
        const result: ISignInComponentResult = {
            email: this.signupForm.value.username,
            password: this.signupForm.value.password,
        };
        this.signIn.emit(result);
    }

    private createForm(): void {
        this.signupForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            username: ['', Validators.required],
        });
    }
}
