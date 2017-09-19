export class TodoCompleted {
    $key?: string = undefined;
    description?: string = undefined;
    isComplete: boolean = true;
    name: string = '';

    public constructor(
        fields?: {
            $key?: string,
            description?: string,
            isComplete?: boolean,
            name?: string,
        }) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
    public isNew(): boolean {
        return (this.$key === undefined);
    }
}
