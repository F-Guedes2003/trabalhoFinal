import Express from 'express';
import router from './routes/student.js';
import bodyParser from 'body-parser';

const app = Express();

app.use(router);
app.use(bodyParser.json);

export default app;