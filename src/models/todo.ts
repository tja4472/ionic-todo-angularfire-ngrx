export interface ToDo {
    $key: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
}
