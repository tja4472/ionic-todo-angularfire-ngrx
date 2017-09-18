import { TodoCompleted } from '../../models/todo-completed.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'tja-todo-completed-detail',
    templateUrl: 'todo-completed-detail.component.html',
})
export class TodoCompletedDetailComponent {
    @Input() public todoCompleted: TodoCompleted;
    @Output() public itemCancelled = new EventEmitter<TodoCompleted>();
    @Output() public itemRemoved = new EventEmitter<TodoCompleted>();
    @Output() public itemSaved = new EventEmitter<TodoCompleted>();

    public todoForm: any;

    private readonly CLASS_NAME = 'TodoCompletedDetailComponent';

    constructor(
        public formBuilder: FormBuilder,
    ) {
        console.log('###%s:constructor', this.CLASS_NAME);
    }

    ngOnInit() {
        console.log('###%s:ngOnInit>', this.CLASS_NAME, this.todoCompleted);
        console.log('this.todo.isNew()>', this.todoCompleted.isNew());

        this.todoForm = this.formBuilder.group({
            description: [this.todoCompleted.description],
            isComplete: [this.todoCompleted.isComplete],
            name: [this.todoCompleted.name, Validators.required],
        });
    }

    public viewDismiss() {
        console.log('###%s:viewDismiss', this.CLASS_NAME);
        this.itemCancelled.emit();
    }

    public viewRemove() {
        console.log('###%s:viewRemove', this.CLASS_NAME);
        this.itemRemoved.emit();
    }

    public viewSave() {
        console.log('###%s:viewSave', this.CLASS_NAME);

        if (!this.todoForm.valid) {
            return;
        }

        console.log('this.todoForm.value>', this.todoForm.value);
        console.log('this.todo>', this.todoCompleted);

        // const editedItem: ITodo = { ...this.todo, ...this.todoForm.value };
        const editedItem: TodoCompleted = Object.assign(new TodoCompleted(), this.todoCompleted, this.todoForm.value);
        console.log('editedItem>', editedItem);

        this.itemSaved.emit(editedItem);
    }
}
