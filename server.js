import Express from 'express';
import http from 'http';
const port = "3000";

const app = Express();

const server = http.createServer(app);

server.listen(port, () => {
    console.log("server active");
})