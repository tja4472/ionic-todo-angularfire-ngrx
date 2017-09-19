export class Todo {
    $key?: string = undefined;
    description?: string = undefined;
    index: number = 0;
    isComplete: boolean = false;
    name: string = '';

    public constructor(
        fields?: {
            $key?: string,
            description?: string,
            index?: number,
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
