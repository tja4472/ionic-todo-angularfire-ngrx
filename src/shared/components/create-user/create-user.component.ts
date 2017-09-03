import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export interface IUserFormResult {
    email: string;
    password: string;
}

@Component({
    selector: 'tja-create-user',
    templateUrl: 'create-user.component.html',
})
export class CreateUserComponent {

    @Input() public error: any;

    @Output() public createUser = new EventEmitter<IUserFormResult>();

    public signupForm: FormGroup;
    private readonly CLASS_NAME = 'CreateUserComponent';

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
        const result: IUserFormResult = {
            email: this.signupForm.value.username,
            password: this.signupForm.value.password,
        };
        this.createUser.emit(result);
    }

    private createForm(): void {
        this.signupForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            username: ['', Validators.required],
        });
    }
}
