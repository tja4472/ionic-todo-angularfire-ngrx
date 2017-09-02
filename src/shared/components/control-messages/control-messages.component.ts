import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

// Angular 2 Form Builder and Validation Management
// https://coryrylan.com/blog/angular-form-builder-and-validation-management

@Component({
  selector: 'tja-control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
})
export class ControlMessagesComponent {
  @Input() control: FormControl;

  get errorMessage() {
    if (this === null) {
      return null;
    }

    if(this.control === undefined) {
      return null;
    }

    if ((this.control === null)
      || (this.control.errors === null)
    ) {
      return null;
    }

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
