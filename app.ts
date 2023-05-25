import express from 'express';
import journeyRouter from './src/routers/journeyRouter';
import stationRouter from './src/routers/stationRouter';

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', stationRouter);
app.use('/', journeyRouter);

export default app;