import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { Todo } from '../../models/todo.model';

@Component({
    selector: 'tja-todo-detail',
    templateUrl: 'todo-detail.component.html',
})
export class TodoDetailComponent {
    @Input() public todo: Todo;
    @Output() public itemCancelled = new EventEmitter<Todo>();
    @Output() public itemSaved = new EventEmitter<Todo>();

    public todoForm: any;

    // private isEditing: boolean = true;

    private readonly CLASS_NAME = 'TodoDetailComponent';

    constructor(
        public formBuilder: FormBuilder,
    ) {
        console.log('###%s:constructor', this.CLASS_NAME);
    }

    ngOnInit() {
        console.log('###%s:ngOnInit>', this.CLASS_NAME, this.todo);
        console.log('this.todo.isNew()>', this.todo.isNew());
        /*
                if (this.todo.$key === undefined) {
                    this.isEditing = false;
                }
        */
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

        // const editedItem: ITodo = { ...this.todo, ...this.todoForm.value };
        const editedItem: Todo = Object.assign(new Todo(), this.todo, this.todoForm.value);
        console.log('editedItem>', editedItem);

        this.itemSaved.emit(editedItem);
    }
}
