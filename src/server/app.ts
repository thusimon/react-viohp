import express from 'express';
import userRouter from './routers/user';
import scoreRouter from './routers/score';
import audioRouter from './routers/audio';

const app = express();

app.use(express.json());

// use routers
app.use(userRouter);
app.use(scoreRouter);
app.use(audioRouter);

export default app;
