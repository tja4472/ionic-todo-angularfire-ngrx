import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type ErrorInput = any;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'error',
    templateUrl: 'error.component.html',
})
export class Error {
    @Input() error: ErrorInput;
}
