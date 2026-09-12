import http from 'node:http';
import { handleAdd, handleAll, handleDelete, handleUpdateTask } from './index.js';
const PORT = 3000;
const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("hi there welcome to task manager");
        res.end();
    }
    else if (url === '/tasks' && req.method === 'GET') {
        let data = handleAll();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data.length !== 0 ? JSON.stringify(data) : 'task list is empty');
        res.end();
    }
    else if (url?.startsWith('/tasks/') && req.method === 'GET') {
        console.log('hi');
        const urlParts = url.split('/');
        const taskId = parseInt(urlParts[2]);
        let data = handleAll();
        let task = data.filter(t => t.id == taskId);
        console.log("bye", task);
        res.writeHead(200, { "content-Type": "text/html" });
        res.write(!task ? `task with id:${taskId} not found` : JSON.stringify(task));
        res.end();
    }
    else if (url === '/tasks' && req.method === 'POST') {
        // curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json"   -d '{"text":"play football"}'
        let task_text = '';
        req.on('data', chunk => {
            task_text += chunk;
        });
        req.on('end', async () => {
            let taskTextData = JSON.parse(task_text);
            console.log(taskTextData['text']);
            const data = await handleAdd(taskTextData['text']);
            if (data)
                sentSuccessReponse(res, `task added successfully`);
            else
                sentErrorResponse(res, 'failed to add task');
        });
    }
    else if (url?.startsWith('/tasks/') && req.method === 'PATCH') {
        // curl -X PATCH http://localhost:3000/tasks/   -H "Content-Type: application/json"   -d '{"id":"0","task_name":"play nothing"}'
        console.log(`patch called`);
        let task_text = '';
        req.on('data', chunk => {
            task_text += chunk;
        });
        req.on('end', () => {
            let changes = JSON.parse(task_text);
            console.log(changes);
            let isUpdated = handleUpdateTask(Number(changes["id"]), changes);
            if (isUpdated)
                sentSuccessReponse(res, 'task updated successfully');
            else
                sentErrorResponse(res, 'failed to update task');
        });
    }
    else if (url?.startsWith('/tasks/') && req.method === 'DELETE') {
        let urlParts = url.split('/');
        let taskId = urlParts[2];
        let isDeleted = handleDelete(Number(taskId));
        if (isDeleted)
            sentSuccessReponse(res, `task with id:${taskId} deleted`);
        else
            sentErrorResponse(res, 'failed to delete task');
    }
    else {
        sentErrorResponse(res, 'route not found');
    }
});
server.listen(PORT, () => {
    console.log(`server listening on port:${PORT}`);
});
function sentSuccessReponse(res, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(JSON.stringify(data));
    res.end();
}
function sentErrorResponse(res, data) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(JSON.stringify(data));
    res.end();
}
