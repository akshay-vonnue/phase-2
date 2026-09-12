import { writeFile } from 'fs/promises';
import { loadData, writeData } from '../utils/file.js';
let data;
const filePath = `/home/akshay.antony/training/phase-2/day-2/task-cli/data/tasks.json`;
export default async function init_task_manager() {
    let args = process.argv.splice(2);
    let command = args.shift();
    // console.log(command)
    // console.log(...args)
    data = await loadData();
    if (!data)
        return;
    switch (command) {
        case 'add':
            handleAdd(...args);
            break;
        case 'delete':
            handleDelete(Number(args[0]));
            break;
        case 'filter':
            handleFilter(args[0]);
            break;
        case 'all':
            handleAll();
            break;
        case 'complete':
            handleComplete(Number(args[0]));
            break;
        case '--help':
            handleHelp();
            break;
        case '--output':
            handleOutputJSON();
            break;
        default:
            handleHelp();
            break;
    }
}
function generateId(data) {
    let maxId = data.reduce((maxId, val) => Math.max(maxId, val.id), -1);
    return maxId + 1;
}
export async function handleAdd(...new_task) {
    let newId = generateId(data);
    data.push({
        id: newId,
        task_name: new_task.join(" "),
        isCompleted: false
    });
    await writeData(data);
    return newId;
}
init_task_manager();
export function handleDelete(id) {
    let task = data.find(t => t.id === id);
    if (task) {
        data = data.filter((task) => task.id != id);
        writeData(data);
        return data;
    }
    else {
        return -1;
    }
}
export function handleFilter(args) {
    if (args === 'completed') {
        data.forEach(task => task.isCompleted && console.log(task.task_name));
    }
    else if (args === 'pending') {
        data.forEach(task => !task.isCompleted && console.log(task.task_name));
    }
}
export function handleAll() {
    data.forEach(task => console.log(task.task_name));
    return data;
}
export function handleComplete(id) {
    data = data.map(task => {
        if (task.id === id) {
            return {
                ...task,
                isCompleted: !task.isCompleted
            };
        }
        else {
            return task;
        }
    });
    writeData(data);
}
export function handleHelp() {
    console.log(`
### TASK MANAGER ###

#. add 'your todo'
#. delete 'todo id'
#. filter 'completed' or 'pending'
#. all
#. complete 'todo id'
#. --help
        `);
}
export function handleUpdateTask(id, updates) {
    console.log(id, updates);
    let task = data.find(t => t.id === id);
    if (task) {
        data = data.map(task => {
            if (task.id !== id) {
                return task;
            }
            return {
                ...task,
                ...updates
            };
        });
        writeData(data);
        console.log(`task updated success`);
        console.log(data);
        return data;
    }
    else {
        return -1;
    }
}
export async function handleOutputJSON() {
    let stringifiedData = JSON.stringify(data);
    try {
        await writeFile('output.json', stringifiedData, 'utf8');
    }
    catch (error) {
        console.log(error);
    }
}
