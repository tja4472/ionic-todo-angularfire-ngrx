export class TodoCompleted {
    $key?: string = undefined;
    description?: string = undefined;
    isComplete: boolean = true;
    name: string = '';
    userId: string = '';

    public isNew(): boolean {
        return (this.$key === undefined);
    }
}
