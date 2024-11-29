import Express from 'express';
import router from './routes/student.js';
import userRouter from './routes/user.js';
import bodyParser from 'body-parser';
import { connectToMongo } from './databaseConnection.js';

const app = Express();

app.use(bodyParser.json());
app.use(userRouter);
app.use(router);
connectToMongo();

export default app;