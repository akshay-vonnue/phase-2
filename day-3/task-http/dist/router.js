import http from 'node:http';
module.exports = http.createServer((req, res) => {
    if (!req.url)
        return;
    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (reqUrl.pathname === '/tasks' && req.method === 'GET') {
        console.log(`Request type:` + req.method + 'Endpoint:' + req.url);
    }
});
