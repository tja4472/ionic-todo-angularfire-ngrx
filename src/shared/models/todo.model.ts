export interface ITodo {
    $key?: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
    userId: string;
}
