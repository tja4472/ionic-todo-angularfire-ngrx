export interface ITodo {
    $key?: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
    userId: string;
    isNew(): boolean;
}

export class Todo implements ITodo {
    $key?: string = undefined;
    description?: string = undefined;
    index: number = 0;
    isComplete: boolean = false;
    name: string = '';
    userId: string = '';

    public isNew(): boolean {
        return (this.$key === undefined);
    }
}
