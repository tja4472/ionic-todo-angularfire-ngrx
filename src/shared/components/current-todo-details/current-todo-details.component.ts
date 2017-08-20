import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { ITodo } from '../../models/todo.model';

@Component({
    selector: 'tja-current-todo-details',
    templateUrl: 'current-todo-details.component.html',
})
export class CurrentTodoDetailsComponent {
    @Input() public todo: ITodo;
    @Output() public itemCancelled = new EventEmitter<ITodo>();
    @Output() public itemSaved = new EventEmitter<ITodo>();

    public todoForm: any;

    private isEditing: boolean = true;

    private readonly CLASS_NAME = 'CurrentTodoDetailsComponent';

    constructor(
        public formBuilder: FormBuilder,
    ) {
        console.log('###%s:constructor', this.CLASS_NAME);
    }

    ngOnInit() {
        console.log('###%s:ngOnInit>', this.CLASS_NAME, this.todo);

        if (this.todo.$key === undefined) {
            this.isEditing = false;
        }
        this.todoForm = this.formBuilder.group({
            description: [this.todo.description],
            isComplete: [this.todo.isComplete],
            name: [this.todo.name, Validators.required],
        });
    }

    dismiss() {
        console.log('###%s:dismiss', this.CLASS_NAME);
        this.itemCancelled.emit();
    }

    save() {
        console.log('###%s:save', this.CLASS_NAME);

        if (!this.todoForm.valid) {
            return;
        }

        console.log('this.todoForm.value>', this.todoForm.value);
        console.log('this.todo>', this.todo);

        const editedItem: ITodo = { ...this.todo, ...this.todoForm.value };
        console.log('editedItem>', editedItem);

        this.itemSaved.emit(editedItem);
    }
}
