import { readFile, writeFile } from 'node:fs/promises';
const filePath = `/home/akshay.antony/training/phase-2/day-2/task-cli/data/tasks.json`;
export async function loadData() {
    try {
        const data = await readFile(filePath, "utf8");
        const config = JSON.parse(data);
        return config;
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            await writeFile(filePath, "[]", 'utf8');
            console.log(`file not found.`);
            console.log(`creating new task tracker file`);
            console.log(`try re-running the command...`);
        }
    }
}
export async function writeData(data) {
    try {
        const tasks = JSON.stringify(data);
        await writeFile(filePath, tasks, 'utf8');
        console.log(`task saved successfully`);
    }
    catch (e) {
        // console.log(e)
    }
}
