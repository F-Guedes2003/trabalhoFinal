import Express from 'express';
import router from './routes/student.js';
import bodyParser from 'body-parser';
import { connectToMongo } from './databaseConnection.js';

const app = Express();

app.use(router);
app.use(bodyParser.json);
connectToMongo();

export default app;