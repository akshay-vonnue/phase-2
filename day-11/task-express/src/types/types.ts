export type Task = {
    id: number,
    task_name: string,
    isCompleted: boolean
}

export type Action = 'add' | 'delete' | 'filter' | 'all' | 'complete' | '--help' | '--output'


// Add, list, complete, delete and filter tasks.
