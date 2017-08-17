export interface IToDo {
    $key: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
}
